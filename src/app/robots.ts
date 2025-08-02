import { getBaseUrl } from "@/lib/config";

export default function robots() {
  const baseUrl = getBaseUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
          "/admin/",
          "/wp-admin/",
          "/wp-includes/",
          "/wp-content/uploads/",
          "/*?*utm_*",
          "/*?*ref=*",
          "/*?*fbclid=*",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        crawlDelay: 1,
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/sitemap-posts.xml`,
      `${baseUrl}/sitemap-pages.xml`,
    ],
  };
}
