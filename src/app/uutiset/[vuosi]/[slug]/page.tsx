import Link from "next/link";
import Image from "next/image";
import { getPostBySlug, type Post } from "@/lib/queries/posts";
import type { Metadata } from "next";
import { getBaseUrl } from "@/lib/config";

type Props = {
  params: Promise<{ vuosi: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const post = await getPost(resolvedParams.slug);
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
        modifiedTime: post.modified || post.date,
        images: post.featuredImage ? [post.featuredImage.sourceUrl] : [],
      },
    };
  } catch {
    return {
      title: "Virhe - Sukeltajat ry",
      description: "Tapahtui virhe sivua ladatessa.",
    };
  }
}

async function getPost(slug: string): Promise<Post | null> {
  try {
    return await getPostBySlug(slug);
  } catch {
    console.error("Error fetching post");
    return null;
  }
}

export const revalidate = 300;

export default async function PostPage({ params }: Props) {
  const resolvedParams = await params;
  const year = parseInt(resolvedParams.vuosi);
  const post = await getPost(resolvedParams.slug);

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
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1
            className="text-4xl font-bold text-white mb-6"
            style={{ fontSize: "2.25rem" }}
          >
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
  const modifiedDate = post.modified ? new Date(post.modified) : postDate;

  // Structured Data for Article
  const articleLD = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title.replace(/<[^>]*>/g, ""),
    description: post.excerpt.replace(/<[^>]*>/g, "").substring(0, 160),
    image: post.featuredImage?.sourceUrl || getBaseUrl() + "/og-image.svg",
    datePublished: post.date,
    dateModified: post.modified || post.date,
    author: {
      "@type": "Person",
      name: post.author?.name || "Sukeltajat ry",
    },
    publisher: {
      "@type": "Organization",
      name: "Sukeltajat ry",
      logo: {
        "@type": "ImageObject",
        url: getBaseUrl() + "/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${getBaseUrl()}/uutiset/${year}/${post.slug}`,
    },
    articleSection: post.categories[0]?.name || "Uutiset",
    keywords:
      post.tags?.map((tag) => tag.name).join(", ") || "sukeltaminen, uutiset",
    inLanguage: "fi-FI",
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleLD),
        }}
      />

      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 min-h-screen">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
          <article>
            <nav
              className="flex items-center space-x-2 text-sm text-blue-200 mb-8"
              aria-label="Breadcrumb"
            >
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
                {post.categories.length > 0 && (
                  <>
                    <span>•</span>
                    <span>{post.categories[0].name}</span>
                  </>
                )}
                {post.author?.name && (
                  <>
                    <span>•</span>
                    <span>{post.author.name}</span>
                  </>
                )}
              </div>

              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight"
                style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)" }}
                dangerouslySetInnerHTML={{ __html: post.title }}
              />

              {post.featuredImage && (
                <div className="relative h-96 md:h-[500px] w-full mb-8 rounded-xl overflow-hidden shadow-2xl">
                  <Image
                    src={post.featuredImage.sourceUrl}
                    alt={post.featuredImage.altText || post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
                </div>
              )}
            </header>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-2xl border border-blue-400/20 mb-8">
              <div
                className="prose prose-lg max-w-none text-white prose-headings:text-white prose-a:text-blue-300 prose-a:no-underline hover:prose-a:underline hover:prose-a:text-blue-200 prose-p:text-white prose-li:text-white prose-strong:text-white prose-em:text-blue-100 prose-blockquote:text-blue-100 prose-blockquote:border-blue-400/30 prose-code:text-blue-200 prose-code:bg-blue-900/30 prose-pre:bg-blue-900/50 prose-pre:text-white prose-hr:border-blue-400/30"
                dangerouslySetInnerHTML={{
                  __html: post.content || post.excerpt,
                }}
              />
            </div>

            <footer className="bg-white/10 backdrop-blur-sm rounded-xl p-6 lg:p-8 border border-blue-400/20">
              {post.tags && post.tags.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-white mb-3">
                    Avainsanat:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
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
    </>
  );
}
