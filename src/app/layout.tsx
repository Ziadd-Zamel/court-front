import { Zain } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/header";

// تحميل خط Zain
const zain = Zain({
  subsets: ["arabic"],
  variable: "--font-zain",
  weight: ["200", "300", "400", "700", "800", "900"],
});

export const metadata = {
  title: "المحكمة العليا الليبية",
  description: "الموقع الرسمي للمحكمة العليا الليبية",
  keywords: "ليبيا, المحكمة العليا, القضاء, قانون",
  viewport: "width=device-width, initial-scale=1.0",
  charset: "utf-8",
  icons: {
    icon: "/favicon.ico",
  },
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
    <html lang="ar" dir="rtl" className={zain.variable}>
      <body className="font-zain antialiased bg-background">
        <Providers>
          <main className="flex flex-col min-h-screen overflow-hidden">
            <Navbar />
            <div className="flex-1">{children}</div>
            <Footer />
          </main>
        </Providers>
      </body>
    </html>
  );
}
