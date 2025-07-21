import Link from "next/link";
import Image from "next/image";
import { GET_POST_BY_SLUG } from "@/lib/queries/posts";
import client from "@/lib/wpClient";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ vuosi: string; slug: string }>;
};

type Post = {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  date: string;
  modified: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
      mediaDetails: {
        width: number;
        height: number;
      };
    };
  };
  categories: {
    nodes: Array<{
      name: string;
      slug: string;
    }>;
  };
  tags: {
    nodes: Array<{
      name: string;
      slug: string;
    }>;
  };
  author: {
    node: {
      name: string;
      slug: string;
    };
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const post = await getPostBySlug(resolvedParams.slug);
    if (!post) {
      return {
        title: "Artikkelia ei löytynyt - Sukeltajat ry",
        description: "Hakemaasi artikkelia ei löytynyt.",
      };
    }

    const cleanExcerpt = post.excerpt.replace(/<[^>]*>/g, "").substring(0, 160);

    return {
      title: `${post.title} - Sukeltajat ry`,
      description: cleanExcerpt,
      openGraph: {
        title: post.title,
        description: cleanExcerpt,
        type: "article",
        publishedTime: post.date,
        modifiedTime: post.modified,
        images: post.featuredImage ? [post.featuredImage.node.sourceUrl] : [],
      },
    };
  } catch {
    return {
      title: "Virhe - Sukeltajat ry",
      description: "Tapahtui virhe sivua ladatessa.",
    };
  }
}

async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const { data } = await client.query({
      query: GET_POST_BY_SLUG,
      variables: { slug },
    });
    return data.postBy;
  } catch {
    console.error("Error fetching post");
    return null;
  }
}

export const revalidate = 300;

export default async function PostPage({ params }: Props) {
  const resolvedParams = await params;
  const year = parseInt(resolvedParams.vuosi);
  const post = await getPostBySlug(resolvedParams.slug);

  if (!post) {
    return (
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 min-h-screen">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center">
          <div className="w-20 h-20 bg-blue-100/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-8 border border-blue-400/20">
            <svg
              className="w-10 h-10 text-blue-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-white mb-6">
            Artikkelia ei löytynyt
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Hakemaasi artikkelia ei löytynyt tai se on poistettu syvyyksistä.
          </p>
          <Link
            href={`/uutiset/${year}`}
            className="inline-flex items-center px-8 py-4 bg-blue-600/80 backdrop-blur-sm text-white font-medium rounded-xl hover:bg-blue-500/80 transition-all duration-200 group border border-blue-400/30"
          >
            <svg
              className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Takaisin vuoden {year} uutisiin
          </Link>
        </div>
      </div>
    );
  }

  const postDate = new Date(post.date);
  const modifiedDate = new Date(post.modified);

  return (
    <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 min-h-screen">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        <article>
          <nav className="flex items-center space-x-2 text-sm text-blue-200 mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              Etusivu
            </Link>
            <span>/</span>
            <Link
              href="/uutiset"
              className="hover:text-white transition-colors"
            >
              Uutiset
            </Link>
            <span>/</span>
            <Link
              href={`/uutiset/${year}`}
              className="hover:text-white transition-colors"
            >
              {year}
            </Link>
            <span>/</span>
            <span className="text-white">
              {post.title.replace(/<[^>]*>/g, "")}
            </span>
          </nav>

          <header className="mb-8">
            <div className="flex items-center gap-2 text-sm text-blue-200 mb-6">
              <time dateTime={post.date}>
                {postDate.toLocaleDateString("fi-FI", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              {post.categories.nodes.length > 0 && (
                <>
                  <span>•</span>
                  <span>{post.categories.nodes[0].name}</span>
                </>
              )}
              {post.author.node.name && (
                <>
                  <span>•</span>
                  <span>{post.author.node.name}</span>
                </>
              )}
            </div>

            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight"
              dangerouslySetInnerHTML={{ __html: post.title }}
            />

            {post.featuredImage && (
              <div className="relative h-96 md:h-[500px] w-full mb-8 rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src={post.featuredImage.node.sourceUrl}
                  alt={post.featuredImage.node.altText || post.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
              </div>
            )}
          </header>

          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-2xl border border-blue-400/20 mb-8">
            <div
              className="prose prose-lg max-w-none prose-blue prose-headings:text-slate-900 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-p:text-slate-700 prose-li:text-slate-700"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          <footer className="bg-white/10 backdrop-blur-sm rounded-xl p-6 lg:p-8 border border-blue-400/20">
            {post.tags.nodes.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-white mb-3">
                  Avainsanat:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.nodes.map((tag) => (
                    <span
                      key={tag.slug}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100/20 text-blue-100 border border-blue-400/30"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {post.date !== post.modified && (
              <p className="text-sm text-blue-200 mb-6">
                Päivitetty: {modifiedDate.toLocaleDateString("fi-FI")}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/uutiset/${year}`}
                className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm text-blue-100 font-medium rounded-xl hover:bg-white/20 transition-all duration-200 group border border-blue-400/30"
              >
                <svg
                  className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Takaisin vuoden {year} uutisiin
              </Link>
              <Link
                href="/uutiset"
                className="inline-flex items-center px-6 py-3 bg-blue-600/80 backdrop-blur-sm text-white font-medium rounded-xl hover:bg-blue-500/80 transition-all duration-200 border border-blue-400/30"
              >
                Kaikki uutiset
              </Link>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
}
