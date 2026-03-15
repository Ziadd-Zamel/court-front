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
    title: a.category,
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
    <section className="py-16 bg-main/10 dark:bg-[#1a1a1a]">
      <AnimatedSectionHeader
        title="أنشطة المحكمة العليا"
        textClassName="text-foreground"
      />
      <div className="mt-7 flex flex-col items-center justify-center lg:flex-row box-container ">
        <div className="flex w-full flex-col items-start text-right lg:w-[50%]">
          <div className="flex w-full text-right">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
            >
              <StaggeredNavigationCarousel
                testimonials={itemsByPage}
                onCardClick={handleCardClick}
              />
            </motion.div>
          </div>
          <Link
            href="/about-court/news"
            className="cursor-pointer pl-[15px] text-left text-lg font-bold text-main hover:text-main/80"
          >
            اطلع على كل الأنشطة
          </Link>
        </div>
        <div className="mb-20 w-full lg:mt-0 lg:w-[50%]">
          <motion.div
            className="w-full border h-[425px] bg-white dark:bg-[#121212] border-border px-7 py-5 shadow-lg"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {SelectedNew && (
              <motion.div
                className="flex min-h-[100px] w-full cursor-pointer flex-col space-y-2 rounded-md bg-white dark:bg-[#121212] text-right"
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
                  <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white dark:from-[#121212] to-transparent" />
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RecentNews;
