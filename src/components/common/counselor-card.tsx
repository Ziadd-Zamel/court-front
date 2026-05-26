"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const borderTransition = (delay = 0) => ({
  duration: 0.7,
  ease: "easeOut" as const,
  delay,
});

export default function CounselorCard({ counselor }: { counselor: Counselor }) {
  const [isHovered, setIsHovered] = useState(false);

  const getYear = (date?: string | null) => {
    if (!date) return "----";
    return date.slice(0, 4);
  };
  const birthYear = getYear(counselor.birth_date);
  const normalQualText = counselor.qualification?.trim();
  const higherQualText = counselor.higher_qualification?.trim();
  const normalQualLine =
    normalQualText &&
    `${getYear(counselor.qualification_date)}، ${normalQualText}`;
  const higherQualLine =
    higherQualText &&
    `${getYear(counselor.higher_qualification_date)}، ${higherQualText}`;
  const appointedYear = counselor.appointed_year || "----";
  const experienceYears = counselor.experience_years ?? "----";
  const footerText =
    counselor.status === "current" ? counselor.tasks : "متقاعد";

  return (
    <motion.div
      className="relative h-full w-full"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{
        y: -5,
        boxShadow: "0 10px 25px -5px rgba(214, 158, 46, 0.25)",
      }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="relative flex h-full min-h-0 min-w-0 flex-1 flex-col border border-gray-100 bg-white shadow-xl transition-all duration-300 dark:border-white/10 dark:bg-white/10">
        <div className="flex min-h-[260px] shrink-0 flex-col items-center gap-3 p-6 pb-4">
          <Avatar className="size-18 border-2 border-main/20 dark:border-main/40">
            <AvatarFallback className="bg-main/5 text-2xl font-bold text-main dark:bg-white/10">
              {counselor.name.slice(0, 1)}
            </AvatarFallback>
            {counselor.image && <AvatarImage src={counselor.image} />}
          </Avatar>

          <h3 className="flex min-h-[40px] items-center text-center text-sm font-bold leading-snug text-gray-900 dark:text-white">
            {counselor.name}
          </h3>

          {counselor.fields?.[0]?.field && (
            <span className="rounded-full border border-main/60 bg-white px-3 py-1 text-center text-xs font-medium text-main shadow-sm dark:border-white/20 dark:bg-white/10">
              {counselor.fields[0].field}
            </span>
          )}
        </div>

        <div className="mx-6 h-px shrink-0 bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-white/20" />

        <ol
          className="flex min-h-0 flex-1 flex-col justify-start gap-2 px-6 py-4"
          dir="rtl"
        >
          <li className="flex items-center gap-2 text-xs text-gray-500 dark:text-white/70">
            <span className="size-1.5 shrink-0 rounded-full bg-main/40" />
            {birthYear}
          </li>
          {normalQualLine && (
            <li className="flex items-start gap-2 text-xs leading-relaxed text-slate-600 dark:text-white/70">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-main/40" />
              <span className="min-w-0 flex-1">{normalQualLine}</span>
            </li>
          )}
          {higherQualLine && (
            <li className="flex items-start gap-2 text-xs leading-relaxed text-slate-600 dark:text-white/70">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-main/40" />
              <span className="min-w-0 flex-1">{higherQualLine}</span>
            </li>
          )}
          <li className="flex items-center gap-2 text-xs text-gray-500 dark:text-white/70">
            <span className="size-1.5 shrink-0 rounded-full bg-main/40" />
            {appointedYear}، مستشاراً بالمحكمة العليا
          </li>
          <li className="flex items-center gap-2 text-xs text-gray-500 dark:text-white/70">
            <span className="size-1.5 shrink-0 rounded-full bg-main/40" />
            {experienceYears} عاماً في العمل القضائي
          </li>
        </ol>

        <div className="mx-6 h-px shrink-0 bg-gradient-to-r from-transparent via-gray-800 to-transparent dark:via-gray-400" />

        <div className="mt-auto min-h-[50px] shrink-0 border-black px-6 pb-5 dark:border-transparent">
          {footerText && (
            <p
              className="pt-2 text-center text-xs font-bold leading-relaxed text-black dark:text-white"
              dir="rtl"
            >
              {footerText}
            </p>
          )}
        </div>

        <div
          className={`pointer-events-none absolute inset-0 z-20 transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <motion.div
            className="absolute left-0 top-0 h-[2px] w-full origin-left bg-main"
            initial={false}
            animate={{ scaleX: isHovered ? 1 : 0 }}
            transition={borderTransition(0)}
          />
          <motion.div
            className="absolute left-0 top-0 h-full w-[2px] origin-top bg-main"
            initial={false}
            animate={{ scaleY: isHovered ? 1 : 0 }}
            transition={borderTransition(0.1)}
          />
          <motion.div
            className="absolute bottom-0 right-0 h-[2px] w-full origin-right bg-main"
            initial={false}
            animate={{ scaleX: isHovered ? 1 : 0 }}
            transition={borderTransition(0.2)}
          />
          <motion.div
            className="absolute bottom-0 right-0 h-full w-[2px] origin-bottom bg-main"
            initial={false}
            animate={{ scaleY: isHovered ? 1 : 0 }}
            transition={borderTransition(0.3)}
          />
        </div>
      </div>
    </motion.div>
  );
}
