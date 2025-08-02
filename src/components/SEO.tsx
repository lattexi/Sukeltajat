import Link from "next/link";
import { type Post } from "@/lib/queries/posts";
import { getBaseUrl } from "@/lib/config";

interface BreadcrumbProps {
  items: Array<{
    label: string;
    href?: string;
  }>;
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const breadcrumbLD = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href && { item: `${getBaseUrl()}${item.href}` }),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbLD),
        }}
      />
      <nav
        aria-label="Breadcrumb"
        className="flex items-center space-x-2 text-sm text-blue-200 mb-8"
      >
        {items.map((item, index) => (
          <span key={index} className="flex items-center">
            {index > 0 && <span className="mx-2">/</span>}
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-white">{item.label}</span>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}

interface PostListLDProps {
  posts: Post[];
  title: string;
  description: string;
}

export function PostListLD({ posts, title, description }: PostListLDProps) {
  const collectionLD = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description: description,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: posts.length,
      itemListElement: posts.map((post, index) => ({
        "@type": "Article",
        position: index + 1,
        headline: post.title.replace(/<[^>]*>/g, ""),
        datePublished: post.date,
        author: {
          "@type": "Person",
          name: post.author?.name || "Sukeltajat ry",
        },
        url: `${getBaseUrl()}/uutiset/${new Date(post.date).getFullYear()}/${
          post.slug
        }`,
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(collectionLD),
      }}
    />
  );
}
