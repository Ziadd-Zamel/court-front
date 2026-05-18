// app/layout.tsx
import { Zain, Merriweather } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "@/components/providers";
import Header from "@/components/layout/header";
import AccessibilityWrapper from "@/components/custom/accessibility-wrapper";
import ScrollToTopButton from "@/components/custom/scroll-to-top-button";
import Footer from "@/components/layout/Footer";
import NextTopLoader from "nextjs-toploader";
import NavigationLoader from "@/components/common/navigation-loader";

const zain = Zain({
  subsets: ["arabic"],
  variable: "--font-zain",
  weight: ["200", "300", "400", "700", "800", "900"],
});

const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-merriweather",
  weight: ["300", "400", "700", "900"],
});

const majalla = localFont({
  src: "./fonts/majalla.ttf",
  variable: "--font-majalla",
  display: "swap",
});

const adobeArabic = localFont({
  src: "./fonts/adobearabic.ttf",
  variable: "--font-adobe-arabic",
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  title: "المحكمة العليا الليبية",
  description: "الموقع الرسمي للمحكمة العليا الليبية",
  keywords: "ليبيا, المحكمة العليا, القضاء, قانون",
  charset: "utf-8",
  icons: { icon: "/faviconss.ico" },
  openGraph: {
    title: "المحكمة العليا الليبية",
    description: "الموقع الرسمي للمحكمة العليا الليبية",
    locale: "ar_AR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      suppressHydrationWarning
      className={`${zain.variable} ${merriweather.variable} ${majalla.variable} ${adobeArabic.variable}`}
    >
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/yts8tvr.css" />
      </head>

      <body className="font-zain antialiased bg-background">
        {/* ✅ TopLoader OUTSIDE Providers, at top level */}
        <NextTopLoader
          color="#C8A96E"
          height={3}
          showSpinner={false}
          shadow="0 0 10px #C8A96E, 0 0 5px #C8A96E"
        />
        <Providers>
          <NavigationLoader />
          <main className="flex flex-col min-h-screen overflow-hidden">
            <Header />
            <div className="flex-1">{children}</div>
            <Footer />
          </main>
          <AccessibilityWrapper />
          <ScrollToTopButton />
        </Providers>
      </body>
    </html>
  );
}
