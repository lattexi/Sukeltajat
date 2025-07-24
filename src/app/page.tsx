import { Suspense } from "react";
import Link from "next/link";
import PostCard from "@/components/PostCard";
import { getLatestPosts, type Post } from "@/lib/queries/posts";

async function getHomePosts() {
  try {
    return await getLatestPosts(6);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export const revalidate = 300; // 5 minutes

export default async function HomePage() {
  const posts: Post[] = await getHomePosts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white py-28 lg:py-36 overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/10 backdrop-blur-3xl"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center bg-blue-100/10 backdrop-blur-sm text-blue-100 text-sm font-medium px-4 py-2 rounded-full mb-8 border border-blue-400/20">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Perustettu 1976
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-10 text-white drop-shadow-2xl">
              Sukeltajat ry
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-blue-100 mb-8 font-light">
              Sukeltamista hyvässä seurassa syvyyksistä
            </p>
            <p className="text-lg lg:text-xl text-blue-200 max-w-4xl mx-auto leading-relaxed mb-12">
              Olemme helsinkiläinen sukeltajaseura, joka tutkii hylkyjä
              Suomenlahdella tukialuksemme MS Maijan avulla. Tervetuloa mukaan
              seikkailuun syvyyksiin!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/uutiset"
                className="inline-flex items-center px-8 py-4 bg-blue-600/80 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-blue-500/80 hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-2xl border border-blue-400/30"
              >
                Tutustu uutisiin
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
              <Link
                href="/yhdistys"
                className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm text-blue-100 font-semibold rounded-xl hover:bg-white/20 hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-2xl border border-blue-400/30"
              >
                Lue lisää seurasta
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Posts Section */}
      <section className="py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-blue-100/10 backdrop-blur-sm text-blue-100 rounded-full text-sm font-semibold mb-6 border border-blue-400/20">
              Ajankohtaista
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Tuoreimmat uutiset
            </h2>
            <p className="text-lg lg:text-xl text-blue-100 max-w-2xl mx-auto">
              Tuoreimmat uutiset ja kuulumiset seuran toiminnasta syvyyksistä
            </p>
          </div>

          <Suspense
            fallback={
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-300"></div>
                <span className="ml-3 text-blue-100">
                  Ladataan uutisia syvyyksistä...
                </span>
              </div>
            }
          >
            {posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <PostCard
                    key={post.id}
                    title={post.title}
                    excerpt={post.excerpt}
                    slug={post.slug}
                    date={post.date}
                    featuredImage={
                      post.featuredImage
                        ? {
                            sourceUrl: post.featuredImage.sourceUrl,
                            altText: post.featuredImage.altText,
                            width: post.featuredImage.mediaDetails.width,
                            height: post.featuredImage.mediaDetails.height,
                          }
                        : undefined
                    }
                    categories={post.categories}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-16 h-16 bg-blue-100/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-400/20">
                  <svg
                    className="w-8 h-8 text-blue-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Ei uutisia saatavilla
                </h3>
                <p className="text-blue-200">
                  Tarkista WordPress-yhteys syvyyksistä.
                </p>
              </div>
            )}
          </Suspense>
        </div>
      </section>
    </div>
  );
}
