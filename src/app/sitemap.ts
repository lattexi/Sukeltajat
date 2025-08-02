import { MetadataRoute } from "next";
import { getLatestPosts } from "@/lib/queries/posts";
import { getBaseUrl } from "@/lib/config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/uutiset`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/yhdistys`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/yhteystiedot`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ];

  // Get dynamic post pages
  let postPages: MetadataRoute.Sitemap = [];
  try {
    const posts = await getLatestPosts(100); // Get more posts for sitemap

    postPages = posts.map((post) => {
      const postYear = new Date(post.date).getFullYear();
      return {
        url: `${baseUrl}/uutiset/${postYear}/${post.slug}`,
        lastModified: new Date(post.modified || post.date),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      };
    });

    // Year archive pages
    const years = [
      ...new Set(posts.map((post) => new Date(post.date).getFullYear())),
    ];
    const yearPages = years.map((year) => ({
      url: `${baseUrl}/uutiset/${year}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

    postPages = [...postPages, ...yearPages];
  } catch (error) {
    console.error("Error generating sitemap:", error);
  }

  return [...staticPages, ...postPages];
}
