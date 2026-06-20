"use client";
import AnimatedSectionHeader from "@/components/common/AnimatedSectionHeader";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import StaggeredNavigationCarousel from "./TestimonialCarousel";
import { cleanHtmlStyles } from "@/lib/utils/clean-html-styles";
import Link from "next/link";

const ARABIC_MONTHS = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
];

export interface NewsCarouselItem {
  uuid: string;
  title: string;
  text: string;
  desc: string;
  day: string;
  month: string;
}

function chunk<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

function mapArticleToItem(a: NewsArticle): NewsCarouselItem {
  const d = a.publish_date ? new Date(a.publish_date) : new Date();
  const day = String(d.getDate());
  const month = ARABIC_MONTHS[d.getMonth()] ?? "ديسمبر";
  return {
    uuid: a.uuid,
    title: a.source,
    text: a.title,
    desc: a.content_html || a.content_text || "",
    day,
    month,
  };
}

const RecentNews = ({ articles = [] }: { articles?: NewsArticle[] }) => {
  const itemsByPage = useMemo(() => {
    const items = articles.map(mapArticleToItem);
    return chunk(items, 3);
  }, [articles]);

  const firstItem = itemsByPage[0]?.[0] ?? null;
  const [SelectedNew, setSelectedNew] = useState<NewsCarouselItem | null>(
    firstItem,
  );

  const handleCardClick = (item: NewsCarouselItem) => {
    setSelectedNew(item);
  };

  if (itemsByPage.length === 0) return null;

  return (
    <section className="bg-main/10 py-12 sm:py-16 dark:bg-[#1a1a1a] lg:py-16">
      <AnimatedSectionHeader
        title="أنشطة المحكمة العليا"
        textClassName="text-foreground"
      />

      <div className="box-container mt-7 flex flex-col items-center justify-center gap-6 lg:flex-row lg:gap-4">
        <div className="order-1 flex w-full min-w-0 flex-col items-start text-right lg:w-[50%]">
          <div className="flex w-full min-w-0 text-right lg:max-w-xl">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
              className="w-full min-w-0"
            >
              <StaggeredNavigationCarousel
                testimonials={itemsByPage}
                onCardClick={handleCardClick}
              />
            </motion.div>
          </div>

          <Link
            href="/about-court/news"
            className="hidden cursor-pointer pl-[15px] text-left text-lg font-bold text-main hover:text-main/80 lg:block"
          >
            اطلع على كل الأنشطة
          </Link>
        </div>

        <div className="order-2 mb-0 w-full min-w-0 lg:mb-20 lg:mt-0 lg:w-[50%]">
          {SelectedNew && (
            <>
              <motion.article
                key={`mobile-${SelectedNew.uuid}`}
                className="flex w-full min-w-0 flex-col overflow-hidden rounded-sm border border-border bg-white shadow-lg dark:bg-[#121212] lg:hidden"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                <div className="border-b border-border/60 px-4 py-4">
                  <h6 className="line-clamp-2 text-sm font-bold leading-snug text-main">
                    {SelectedNew.text}
                  </h6>
                </div>

                <div className="relative px-4 py-4">
                  <div
                    style={{ direction: "rtl" }}
                    className="max-h-48 overflow-hidden !text-justify !font-zain !text-xs !font-normal leading-relaxed text-gray-500 dark:text-white"
                    dangerouslySetInnerHTML={{
                      __html: cleanHtmlStyles(SelectedNew.desc || ""),
                    }}
                  />
                  <div className="pointer-events-none absolute inset-x-4 bottom-4 h-10 bg-gradient-to-t from-white to-transparent dark:from-[#121212]" />
                </div>

                <div className="flex justify-end border-t border-border/60 px-4 py-3">
                  <Link
                    href={`/about-court/news/${SelectedNew.uuid}`}
                    className="text-sm font-bold text-main transition-colors hover:text-main/80"
                  >
                    المزيد
                  </Link>
                </div>
              </motion.article>

              <motion.div
                key={`desktop-${SelectedNew.uuid}`}
                className="hidden h-[425px] w-full border border-border bg-white px-7 py-5 shadow-lg dark:bg-[#121212] lg:block"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <motion.div
                  className="flex min-h-[100px] w-full flex-col space-y-2 rounded-md bg-white text-right dark:bg-[#121212]"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <div className="flex flex-row items-end gap-2 pt-3">
                    <h6 className="text-main">{SelectedNew.text}:</h6>
                  </div>
                  <div className="relative mt-5 h-[280px] overflow-hidden">
                    <div
                      style={{ direction: "rtl" }}
                      className="!text-justify !font-zain !font-normal !text-sm text-gray-500 dark:text-white"
                      dangerouslySetInnerHTML={{
                        __html: cleanHtmlStyles(SelectedNew.desc || ""),
                      }}
                    />
                    <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white to-transparent dark:from-[#121212]" />
                  </div>
                  <div className="flex w-full justify-end pt-1">
                    <Link
                      href={`/about-court/news/${SelectedNew.uuid}`}
                      className="text-sm font-bold text-main transition-colors hover:text-main/80"
                    >
                      المزيد
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            </>
          )}
        </div>

        <Link
          href="/about-court/news"
          className="order-3 cursor-pointer self-start text-sm font-bold text-main transition-colors hover:text-main/80 lg:hidden"
        >
          اطلع على كل الأنشطة
        </Link>
      </div>
    </section>
  );
};

export default RecentNews;
