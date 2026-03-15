"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import CustomBreadcrumb from "./custom-breadcrumb";
import { useRef } from "react";
import { cleanHtmlStyles } from "@/lib/utils/clean-html-styles";

interface Props {
  title: string;
  bgImage: string;
  description?: string;
  /** HTML content for description (cleaned with cleanHtmlStyles). Takes precedence over description when provided. */
  descriptionHtml?: string | null;
  titleClassName?: string;
  descriptionClassname?: string;
  overlay?: boolean;
}

export default function MainHeading({
  bgImage,
  overlay,
  title,
  titleClassName,
  descriptionClassname,
  description,
  descriptionHtml,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section ref={ref} className="relative w-full h-fit pb-10 overflow-hidden">
      {/* Background Image with parallax effect */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <Image
          src={bgImage}
          alt="background-Image"
          fill
          priority
          className="object-cover"
        />
      </motion.div>

      {overlay && <div className="absolute inset-0 bg-black/50 dark:bg-black/60 z-10" />}

      {/**Content container */}
      <div className="relative flex flex-col box-container z-20 gap-8 mt-28">
        {/** Title with Breadcrumb */}
        <div className="flex gap-10 sm:gap-0 sm:flex-row flex-col-reverse w-full max-w-[80%] items-center justify-between">
          <motion.h2
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className={cn(
              titleClassName,
              "text-2xl md:text-3xl font-bold text-white self-start",
            )}
          >
            {title}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="self-start min-w-0 shrink-0"
          >
            <CustomBreadcrumb />
          </motion.div>
        </div>

        {/**Description */}
        {(descriptionHtml || description) && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className={cn(
              descriptionClassname,
              "font-normal text-justify leading-7 -mt-3 text-gray-300 dark:text-white/70 text-xs sm:text-sm md:text-base md:max-w-[80%] [&_p]:mb-2 [&_p:last-child]:mb-0",
            )}
            {...(descriptionHtml
              ? {
                  dangerouslySetInnerHTML: {
                    __html: cleanHtmlStyles(descriptionHtml),
                  },
                }
              : { children: description })}
          />
        )}
      </div>
    </section>
  );
}
