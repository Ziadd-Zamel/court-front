"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

export interface AnimatedSectionHeaderProps {
  title: string;
  subtitle?: string;
  iconClassName?: string;
  textClassName?: string;
  leftClassName?: string;
  rightClassName?: string;
}

const AnimatedSectionHeader: React.FC<AnimatedSectionHeaderProps> = ({
  title,
  subtitle,
  textClassName = "",
  leftClassName = "w-16",
  rightClassName = "w-16",
}) => {
  return (
    <div className="relative text-center">
      <div className="flex items-center justify-center space-x-2">
        {/* Right line (motion) */}
        <motion.span
          aria-hidden
          className={`h-[1px] ${rightClassName} bg-main origin-left`}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        {/* Center image (motion) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Image src={"/assets/shortLogoY.png"} alt="" width={30} height={30} />
        </motion.div>
        {/* Left line (motion) */}
        <motion.span
          aria-hidden
          className={`h-[1px] ${leftClassName} bg-main origin-right`}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>

      <div className="mt-2">
        <motion.h2
          className={`-mt-1 font-zain text-2xl font-bold text-main sm:text-[44px] ${textClassName}`}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
        >
          {title}
        </motion.h2>

        {subtitle ? (
          <motion.p
            className={`mt-1 font-zain font-normal text-black sm:text-xl ${textClassName}`}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          >
            {subtitle}
          </motion.p>
        ) : null}
      </div>
    </div>
  );
};

export default AnimatedSectionHeader;
