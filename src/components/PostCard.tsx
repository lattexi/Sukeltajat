import Link from "next/link";
import Image from "next/image";

interface PostCardProps {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  featuredImage?: {
    sourceUrl: string;
    altText: string;
    width?: number;
    height?: number;
  };
  categories?: Array<{
    name: string;
    slug: string;
  }>;
}

export default function PostCard({
  title,
  excerpt,
  slug,
  date,
  featuredImage,
  categories,
}: PostCardProps) {
  const postDate = new Date(date);
  const year = postDate.getFullYear();

  // Clean excerpt HTML and truncate
  const cleanExcerpt =
    excerpt.replace(/<[^>]*>/g, "").substring(0, 150) + "...";

  const href = `/uutiset/${year}/${slug}`;

  return (
    <article className="group bg-white/10 backdrop-blur-sm rounded-2xl border border-blue-400/20 overflow-hidden hover:shadow-2xl hover:border-blue-300/40 transition-all duration-300 hover:scale-105 hover:-translate-y-1">
      {featuredImage && (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={featuredImage.sourceUrl}
            alt={featuredImage.altText || title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-blue-200 mb-3">
          <time dateTime={date} className="font-medium flex items-center">
            <svg
              className="w-3 h-3 mr-1"
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
            {postDate.toLocaleDateString("fi-FI")}
          </time>
          {categories && categories.length > 0 && (
            <>
              <span className="text-blue-300">•</span>
              <span className="bg-blue-100/10 backdrop-blur-sm text-blue-100 px-2 py-1 rounded-full text-xs border border-blue-400/30">
                {categories[0].name}
              </span>
            </>
          )}
        </div>
        <h2 className="text-xl font-semibold text-white mb-3 leading-tight">
          <Link
            href={href}
            className="group-hover:text-blue-200 transition-colors duration-200"
            dangerouslySetInnerHTML={{ __html: title }}
          />
        </h2>
        <p className="text-blue-100 mb-4 leading-relaxed">{cleanExcerpt}</p>
        <Link
          href={href}
          className="inline-flex items-center text-blue-200 hover:text-white font-medium text-sm group-hover:gap-2 transition-all duration-200"
        >
          Lue lisää
          <svg
            className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200"
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
    </article>
  );
}
