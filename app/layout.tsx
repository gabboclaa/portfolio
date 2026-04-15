import type { Metadata } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gabboclaa.com"),
  title: {
    default: "Gabriele Clara Di Gioacchino — Software Developer",
    template: "%s — Gabriele Clara Di Gioacchino",
  },
  description: "Portfolio of a software developer focused on building clean, thoughtful products.",
  authors: [{ name: "Gabriele Clara Di Gioacchino", url: "https://gabboclaa.com" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "Gabriele Clara Di Gioacchino — Software Developer",
    description: "Portfolio of a software developer focused on building clean, thoughtful products.",
    url: "https://gabboclaa.com",
    siteName: "Gabriele Clara Di Gioacchino",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Gabriele Clara Di Gioacchino portfolio",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gabriele Clara Di Gioacchino — Software Developer",
    description: "Portfolio of a software developer focused on building clean, thoughtful products.",
    images: ["/og-image.png"],
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Gabriele Clara Di Gioacchino",
  url: "https://gabboclaa.com",
  sameAs: [
    "https://github.com/gabboclaa",
    "https://www.linkedin.com/in/gabriele-clara-di-gioacchino",
  ],
  jobTitle: "Software Developer",
  description:
    "Software developer based in Milan, building clean and thoughtful products from architecture to interface.",
  knowsAbout: ["Python", "C++", "React", "Next.js", "MongoDB", "TensorFlow", "Kafka", "Spark"],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Gabriele Clara Di Gioacchino",
  url: "https://gabboclaa.com",
};

/** Prevent </script> injection in JSON-LD strings */
function safeJsonLd(obj: object): string {
  return JSON.stringify(obj).replace(/</g, "\\u003c");
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${dmMono.variable}`}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(websiteSchema) }}
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
