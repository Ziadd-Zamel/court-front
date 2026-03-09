"use client";

import { motion } from "framer-motion";
import HighlightCard from "@/components/common/highlight-card";

const backgrounds = [
  { bg: "bg-white", gradient: "to-white" },
  { bg: "bg-main/10", gradient: "to-[#FBF7F0]" },
  { bg: "bg-white", gradient: "to-white" },
  { bg: "bg-main/15", gradient: "to-[#FBF7F0]" },
] as const;

function chunkIntoPairs<T>(arr: T[]): T[][] {
  const pairs: T[][] = [];
  for (let i = 0; i < arr.length; i += 2) {
    pairs.push(arr.slice(i, i + 2));
  }
  return pairs;
}

export default function SiteHighlightsGrid({
  articles,
}: {
  articles: Article[];
}) {
  const rows = chunkIntoPairs(articles);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.35 },
    },
  };

  const card = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut" as const },
    },
  };

  return (
    <>
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={
            backgrounds[rowIndex % backgrounds.length]?.bg ?? "bg-white"
          }
        >
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 md:gap-x-20 box-container"
            style={{ gridAutoRows: "auto" }}
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
          >
            {row.map((article) => (
              <motion.div key={article.uuid} variants={card}>
                <HighlightCard
                  article={article}
                  gradientFrom={
                    backgrounds[rowIndex % backgrounds.length]?.gradient ??
                    "from-white"
                  }
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      ))}
    </>
  );
}
