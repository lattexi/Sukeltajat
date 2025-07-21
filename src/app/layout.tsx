import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ApolloWrapper from "@/components/ApolloWrapper";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Sukeltajat ry - Sukeltamista hyvässä seurassa jo vuodesta 1976",
  description:
    "Sukeltajat ry on vuonna 1976 perustettu sukeltajaseura Helsingistä. Tutkimme hylkyjä Suomenlahdella tukialuksemme MS Maijan avulla.",
  keywords: [
    "sukeltaminen",
    "diving",
    "sukeltajat",
    "helsinki",
    "suomenlahti",
    "hylyt",
    "MS Maija",
  ],
  authors: [{ name: "Sukeltajat ry" }],
  openGraph: {
    title: "Sukeltajat ry",
    description: "Sukeltamista hyvässä seurassa jo vuodesta 1976",
    type: "website",
    locale: "fi_FI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fi" className={inter.variable}>
      <body className="min-h-screen bg-gray-50 font-sans antialiased">
        <ApolloWrapper>
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
        </ApolloWrapper>
      </body>
    </html>
  );
}
