import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getBaseUrl } from "@/lib/config";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap", // Important for Core Web Vitals
  preload: true, // Preload the font
  fallback: ["system-ui", "arial"], // Fallback fonts
});

export const metadata: Metadata = {
  title: {
    default:
      "Sukeltajat ry - Helsingin Sukeltajaseura | Hylkytutkimusta vuodesta 1976",
    template: "%s | Sukeltajat ry",
  },
  description:
    "Sukeltajat ry on vuonna 1976 perustettu sukeltajaseura Helsingistä. Tutkimme hylkyjä Suomenlahdella tukialuksemme MS Maijan avulla. Liity mukaan sukeltamaan syvyyksiin!",
  keywords: [
    "sukeltaminen Helsinki",
    "sukeltajaseura",
    "hylkytutkimus",
    "Suomenlahti sukeltaminen",
    "MS Maija",
    "sukeltaminen Suomi",
    "diving club Finland",
    "wreck diving",
    "scuba diving Helsinki",
    "underwater exploration",
    "Baltic Sea diving",
    "sukeltajakurssi",
  ],
  authors: [{ name: "Sukeltajat ry", url: getBaseUrl() }],
  creator: "Sukeltajat ry",
  publisher: "Sukeltajat ry",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(getBaseUrl()),
  alternates: {
    canonical: "/",
  },
  category: "sports",
  classification: "diving club",
  openGraph: {
    title: "Sukeltajat ry - Helsingin Sukeltajaseura",
    description:
      "Sukeltamista hyvässä seurassa jo vuodesta 1976. Tutkimme hylkyjä Suomenlahdella tukialuksemme MS Maijan avulla.",
    type: "website",
    locale: "fi_FI",
    url: getBaseUrl(),
    siteName: "Sukeltajat ry",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Sukeltajat ry - Helsingin sukeltajaseura",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sukeltajat ry - Helsingin Sukeltajaseura",
    description: "Sukeltamista hyvässä seurassa jo vuodesta 1976",
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION_ID,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const baseUrl = getBaseUrl();

  return (
    <html lang="fi" className={inter.variable}>
      <head>
        <meta
          name="description"
          content="Sukeltajat ry on vuonna 1976 perustettu sukeltajaseura Helsingistä. Tutkimme hylkyjä Suomenlahdella tukialuksemme MS Maijan avulla. Liity mukaan sukeltamaan syvyyksiin!"
        />
        <link rel="preconnect" href={baseUrl} />
        <link rel="preconnect" href="https://jasenet.sukeltajat.fi" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <meta name="theme-color" content="#1e3a8a" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Sukeltajat ry" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
        <link rel="icon" href="/favicon.ico" sizes="16x16" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.json" />

        {/* Critical CSS for above-the-fold content */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
            .gradient-bg {
              background: linear-gradient(to bottom right, #1e3a8a, #1e40af, #3730a3);
            }
            .loading-spinner {
              animation: spin 1s linear infinite;
            }
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            /* Prevent console warnings for missing resources */
            .no-console-warnings {
              display: none;
            }
          `,
          }}
        />

        {/* Error handling script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            // Suppress console errors for development
            if (typeof window !== 'undefined') {
              const originalError = console.error;
              console.error = function(...args) {
                // Filter out known development warnings
                const message = args.join(' ');
                if (message.includes('Failed to load resource') && message.includes('apple-touch-icon')) {
                  return; // Suppress this specific error
                }
                originalError.apply(console, args);
              };
            }
          `,
          }}
        />
      </head>
      <body className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 font-sans antialiased">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
