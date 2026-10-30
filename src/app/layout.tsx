import type { Metadata } from "next";
import { Syne, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { portfolioContent } from "@/data/content";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import Preloader from "@/components/Preloader";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${portfolioContent.personal.name} | ${portfolioContent.personal.role}`,
  description: portfolioContent.personal.shortBio,
  metadataBase: new URL(portfolioContent.personal.website),
  openGraph: {
    title: `${portfolioContent.personal.name} | ${portfolioContent.personal.role}`,
    description: portfolioContent.personal.shortBio,
    url: portfolioContent.personal.website,
    siteName: portfolioContent.personal.name,
    images: [
      {
        url: portfolioContent.personal.profileImage,
        width: 800,
        height: 800,
        alt: portfolioContent.personal.name,
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: portfolioContent.personal.name,
    jobTitle: portfolioContent.personal.role,
    url: portfolioContent.personal.website,
    email: portfolioContent.personal.email,
    sameAs: [portfolioContent.personal.github],
    image: `${portfolioContent.personal.website}${portfolioContent.personal.profileImage}`,
  };

  return (
    <html
      lang="es"
      className={`${syne.variable} ${inter.variable} ${jetbrainsMono.variable} dark`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-surface font-inter text-on-surface antialiased relative min-h-screen">
        <Preloader />
        <ScrollProgressBar />
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
