import { getApiBaseUrl } from "../config";

// WordPress REST API types
export interface WordPressPost {
  id: number;
  date: string;
  date_gmt: string;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  sticky: boolean;
  template: string;
  format: string;
  categories: number[];
  tags: number[];
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      id: number;
      source_url: string;
      alt_text: string;
      media_details: {
        width: number;
        height: number;
      };
    }>;
    "wp:term"?: Array<
      Array<{
        id: number;
        name: string;
        slug: string;
      }>
    >;
    author?: Array<{
      id: number;
      name: string;
      slug: string;
    }>;
  };
}

// Normalized post type for our application
export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  slug: string;
  date: string;
  modified?: string;
  featuredImage?: {
    sourceUrl: string;
    altText: string;
    mediaDetails: {
      width: number;
      height: number;
    };
  };
  categories: Array<{
    name: string;
    slug: string;
  }>;
  tags?: Array<{
    name: string;
    slug: string;
  }>;
  author?: {
    name: string;
    slug: string;
  };
}

const WP_API_BASE = getApiBaseUrl() + "/";
// const WP_API_BASE = "https://users.metropolia.fi/~lauralek/wp/";

// Helper function to normalize WordPress post to our Post type
function normalizeWordPressPost(wpPost: WordPressPost): Post {
  return {
    id: wpPost.id.toString(),
    title: wpPost.title.rendered,
    excerpt: wpPost.excerpt.rendered.replace(/<[^>]*>/g, ""), // Strip HTML
    content: wpPost.content?.rendered,
    slug: wpPost.slug,
    date: wpPost.date,
    modified: wpPost.modified,
    featuredImage: wpPost._embedded?.["wp:featuredmedia"]?.[0]
      ? {
          sourceUrl: wpPost._embedded["wp:featuredmedia"][0].source_url,
          altText: wpPost._embedded["wp:featuredmedia"][0].alt_text || "",
          mediaDetails: wpPost._embedded["wp:featuredmedia"][0].media_details,
        }
      : undefined,
    categories:
      wpPost._embedded?.["wp:term"]?.[0]?.map((cat) => ({
        name: cat.name,
        slug: cat.slug,
      })) || [],
    tags:
      wpPost._embedded?.["wp:term"]?.[1]?.map((tag) => ({
        name: tag.name,
        slug: tag.slug,
      })) || [],
    author: wpPost._embedded?.author?.[0]
      ? {
          name: wpPost._embedded.author[0].name,
          slug: wpPost._embedded.author[0].slug,
        }
      : undefined,
  };
}

export async function getLatestPosts(limit: number = 6): Promise<Post[]> {
  try {
    const url = `${WP_API_BASE}index.php?rest_route=/wp/v2/posts&per_page=${limit}&_embed=1&orderby=date&order=desc`;
    console.log("API URL:", url);
    console.log("WP_API_BASE:", WP_API_BASE);

    const response = await fetch(url, {
      next: { revalidate: 300 }, // Cache for 5 minutes
      headers: {
        Accept: "application/json",
        "User-Agent": "Sukeltajat-Frontend/1.0",
      },
    });

    console.log("Response status:", response.status);
    console.log("Response ok:", response.ok);

    if (response.ok) {
      const wpPosts: WordPressPost[] = await response.json();
      console.log("Successfully fetched posts:", wpPosts.length);
      return wpPosts.map(normalizeWordPressPost);
    } else {
      console.warn("WordPress REST API not available");
      return [];
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const response = await fetch(
      `${WP_API_BASE}index.php?rest_route=/wp/v2/posts&slug=${slug}&_embed=1`,
      {
        next: { revalidate: 300 },
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (response.ok) {
      const wpPosts: WordPressPost[] = await response.json();
      if (wpPosts.length > 0) {
        return normalizeWordPressPost(wpPosts[0]);
      }
    } else {
      console.warn("WordPress REST API not available");
    }
  } catch (error) {
    console.error("Error fetching post:", error);
  }

  return null;
}

export async function getPostsByYear(
  year: number,
  limit: number = 10,
  offset: number = 0
): Promise<{
  posts: Post[];
  hasMore: boolean;
  total: number;
}> {
  try {
    const response = await fetch(
      `${WP_API_BASE}index.php?rest_route=/wp/v2/posts&per_page=${limit}&offset=${offset}&after=${year}-01-01T00:00:00&before=${
        year + 1
      }-01-01T00:00:00&_embed=1&orderby=date&order=desc`,
      {
        next: { revalidate: 300 },
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (response.ok) {
      const wpPosts: WordPressPost[] = await response.json();
      const total = parseInt(response.headers.get("X-WP-Total") || "0");

      return {
        posts: wpPosts.map(normalizeWordPressPost),
        hasMore: offset + limit < total,
        total,
      };
    } else {
      console.warn("WordPress REST API not available");
    }
  } catch (error) {
    console.error("Error fetching posts by year:", error);
  }

  return {
    posts: [],
    hasMore: false,
    total: 0,
  };
}
