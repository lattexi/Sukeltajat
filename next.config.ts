import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable source maps for better debugging
  productionBrowserSourceMaps: true,
  output: "standalone",

  // Performance optimizations
  experimental: {
    optimizePackageImports: ["@tailwindcss/typography"],
    scrollRestoration: true,
    // Removed optimizeCss as it requires additional dependencies
  },

  // Compression and performance
  compress: true,
  poweredByHeader: false,

  // Image optimization
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "sukeltajat.fi",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "jasenet.sukeltajat.fi",
        port: "",
        pathname: "/**",
      },
    ],
  },

  // Headers for SEO and security
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
        ],
      },
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/sitemap.xml",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/robots.txt",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400",
          },
        ],
      },
    ];
  },

  // Redirects for SEO
  async redirects() {
    return [
      {
        source: "/news",
        destination: "/uutiset",
        permanent: true,
      },
      {
        source: "/about",
        destination: "/yhdistys",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/yhteystiedot",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
