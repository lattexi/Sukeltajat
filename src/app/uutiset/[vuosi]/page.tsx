import { Suspense } from "react";
import Link from "next/link";
import PostCard from "@/components/PostCard";
import { getPostsByYear, type Post } from "@/lib/queries/posts";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ vuosi: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  return {
    title: `Uutiset ${params.vuosi} - Sukeltajat ry`,
    description: `Katso kaikki uutiset vuodelta ${params.vuosi} Sukeltajat ry:ltä`,
  };
}

function LoadingSkeleton() {
  return (
    <div className="grid gap-8 md:gap-12">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl h-48 mb-4 border border-blue-400/20"></div>
          <div className="h-6 bg-white/10 backdrop-blur-sm rounded mb-2 border border-blue-400/20"></div>
          <div className="h-4 bg-white/10 backdrop-blur-sm rounded w-3/4 mb-2 border border-blue-400/20"></div>
          <div className="h-4 bg-white/10 backdrop-blur-sm rounded w-1/2 border border-blue-400/20"></div>
        </div>
      ))}
    </div>
  );
}

async function NewsContent({ year }: { year: string }) {
  try {
    const result = await getPostsByYear(parseInt(year), 20);
    const posts: Post[] = result.posts;

    if (posts.length === 0) {
      return (
        <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg border border-blue-400/20 p-8 lg:p-12 text-center">
          <div className="w-20 h-20 bg-blue-100/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-400/20">
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
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Ei uutisia vuodelta {year}
          </h2>
          <p className="text-blue-100 mb-8">
            Valitettavasti vuodelta {year} ei löytynyt uutisia syvyyksistä.
          </p>
          <Link
            href="/uutiset"
            className="inline-flex items-center px-6 py-3 bg-blue-600/80 backdrop-blur-sm text-white font-medium rounded-xl hover:bg-blue-500/80 transition-all duration-200 group border border-blue-400/30"
          >
            Takaisin uutisiin
            <svg
              className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200"
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
        </div>
      );
    }

    return (
      <div className="grid gap-8 md:gap-12">
        {posts.map((post: Post) => (
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
    );
  } catch (error) {
    console.error("Error fetching posts by year:", error);
    return (
      <div className="bg-red-900/20 backdrop-blur-sm border border-red-400/20 rounded-xl p-8 lg:p-12 text-center">
        <div className="w-20 h-20 bg-red-100/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border border-red-400/20">
          <svg
            className="w-10 h-10 text-red-300"
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
        <h2 className="text-2xl font-bold text-white mb-4">
          Virhe ladatessa uutisia
        </h2>
        <p className="text-red-200 mb-8">
          Uutisten lataaminen syvyyksistä epäonnistui. Yritä päivittää sivu.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center px-6 py-3 bg-red-600/80 backdrop-blur-sm text-white font-medium rounded-xl hover:bg-red-500/80 transition-all duration-200 border border-red-400/30"
        >
          Päivitä sivu
        </button>
      </div>
    );
  }
}

export default async function YearPage(props: Props) {
  const params = await props.params;
  const year = params.vuosi;

  return (
    <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 min-h-screen">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center bg-blue-100/10 backdrop-blur-sm text-blue-100 text-sm font-medium px-4 py-2 rounded-full mb-6 border border-blue-400/20">
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
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Uutisarkisto
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Uutiset <span className="text-blue-300">{year}</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Kaikki uutiset ja artikkelit vuodelta {year} syvyyksistä
          </p>
        </div>

        {/* Content */}
        <Suspense fallback={<LoadingSkeleton />}>
          <NewsContent year={year} />
        </Suspense>
      </div>
    </div>
  );
}
