"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

type FavouriteRulingCardProps = {
  article: Article;
};

export function FavouriteRulingCard({ article }: FavouriteRulingCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const title = article.sub_category;

  const normalize = (value: unknown) => {
    if (value === null || value === undefined) return "";
    const text = String(value).trim();
    if (!text || text.toLowerCase() === "null") return "";
    return text;
  };

  const judicialYear = normalize(article.judicial_year);
  const number = normalize(article.number);
  const sign = normalize(article.sign);
  const articleTitle = normalize(article.title);
  const mainMeta = [judicialYear, number].filter(Boolean).join("/");
  const fullMeta = `${mainMeta}${sign}`.trim();
  const description = [fullMeta, articleTitle].filter(Boolean).join(": ");

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95,
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 100,
      },
    },
  };

  const topBorderVariants = {
    initial: { width: 0 },
    animate: { width: "calc(100% + 5px)" },
  };

  const bottomBorderVariants = {
    initial: { width: 0 },
    animate: { width: "calc(100% + 5px)" },
  };

  const leftBorderVariants = {
    initial: { height: 0 },
    animate: { height: "calc(100% + 2px)" },
  };

  const rightBorderVariants = {
    initial: { height: 0 },
    animate: { height: "calc(100% + 2px)" },
  };

  return (
    <motion.div
      variants={cardVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{
        y: -5,
        boxShadow: "0 10px 25px -5px rgba(214, 158, 46, 0.1)",
      }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
    >
      <Link href={`/article/${article.uuid}?from=${encodeURIComponent("/")}`}>
        <div
          className={`service-card group relative h-36 cursor-pointer overflow-hidden p-2 transition-all duration-500 sm:h-40 sm:p-4 ${
            isHovered ? "bg-transparent" : "bg-[#bfb0854c]"
          }`}
        >
          <div className="flex flex-col justify-start w-full">
            <h3 className="mb-2 text-lg font-normal text-white transition-all duration-500">
              {title}
            </h3>
            <div className="h-[2px] w-[30px] bg-main" />
            <div className="flex items-start gap-2">
              <div className="mt-4">
                <Image
                  src={article.sub_category_icon}
                  alt="Icon"
                  width={24}
                  height={24}
                />
              </div>{" "}
              <p className="mt-3 min-h-6 text-xs font-normal text-gray-300 transition-all duration-500 sm:text-[16px]">
                {description}
              </p>
            </div>
          </div>

          <motion.div
            className="pointer-events-none absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="absolute left-0 top-0 h-[2px] bg-main"
              variants={topBorderVariants}
              initial="initial"
              animate={isHovered ? "animate" : "initial"}
              transition={{
                duration: 0.7,
                ease: "easeOut",
                delay: 0,
              }}
            />
            <motion.div
              className="absolute left-0 top-0 w-[2px] bg-main"
              variants={leftBorderVariants}
              initial="initial"
              animate={isHovered ? "animate" : "initial"}
              transition={{
                duration: 0.7,
                ease: "easeOut",
                delay: 0.1,
              }}
            />
            <motion.div
              className="absolute bottom-0 right-0 h-[2px] bg-main"
              variants={bottomBorderVariants}
              initial="initial"
              animate={isHovered ? "animate" : "initial"}
              transition={{
                duration: 0.7,
                ease: "easeOut",
                delay: 0.2,
              }}
            />
            <motion.div
              className="absolute bottom-0 right-0 w-[2px] bg-main"
              variants={rightBorderVariants}
              initial="initial"
              animate={isHovered ? "animate" : "initial"}
              transition={{
                duration: 0.7,
                ease: "easeOut",
                delay: 0.3,
              }}
            />
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}
