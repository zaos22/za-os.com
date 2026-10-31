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
  metadataBase: new URL("https://github.com/zaos22"),
  openGraph: {
    title: `${portfolioContent.personal.name} | ${portfolioContent.personal.role}`,
    description: portfolioContent.personal.shortBio,
    url: portfolioContent.personal.linkedin,
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
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon.png",
    apple: "/apple-icon.png",
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
    url: portfolioContent.personal.linkedin,
    email: portfolioContent.personal.email,
    sameAs: [portfolioContent.personal.github, portfolioContent.personal.linkedin],
    image: portfolioContent.personal.profileImage,
  };

  return (
    <html
      lang="es"
      className={`${syne.variable} ${inter.variable} ${jetbrainsMono.variable} dark`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('scrollRestoration' in history) {
                history.scrollRestoration = 'manual';
              }
              window.scrollTo(0, 0);
              try {
                var savedLang = localStorage.getItem('preferred_lang') || 'en';
                if (!localStorage.getItem('preferred_lang')) {
                  localStorage.setItem('preferred_lang', 'en');
                }
                if (savedLang === 'es') {
                  document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                } else {
                  document.cookie = 'googtrans=/es/' + savedLang + '; path=/; SameSite=Lax';
                }
              } catch (e) {}
            `,
          }}
        />
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
