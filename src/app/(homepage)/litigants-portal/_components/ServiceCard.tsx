"use client";
import { LucideIcon } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon: Icon,
}) => {
  const [isHovered, setIsHovered] = useState(false);

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
      className="service-card group relative h-44 w-full overflow-hidden bg-[#252120] py-6 pl-12 pr-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{
        y: -5,
        backgroundColor: "transparent",
        boxShadow: "0 10px 25px -5px rgba(214, 158, 46, 0.1)",
      }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
    >
      <div
        style={{ direction: "rtl" }}
        className="relative z-10 flex items-start gap-5"
      >
        <motion.div
          className="mb-4 w-fit rounded-md bg-main/20 p-3"
          whileHover={{
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            whileHover={{ color: "#000000" }}
            transition={{ duration: 0.5 }}
          >
            <Icon className="h-6 w-6 text-orange-500" />
          </motion.div>
        </motion.div>
        <div>
          <motion.h3
            style={{ direction: "rtl" }}
            className="mb-2 font-semibold text-xl text-white"
            whileHover={{ color: "#000000" }}
            transition={{ duration: 0.5 }}
          >
            {title}
          </motion.h3>
          <motion.p
            style={{ direction: "rtl" }}
            className="min-h-7 text-md text-gray-400"
            whileHover={{ color: "#000000" }}
            transition={{ duration: 0.5 }}
          >
            {description}
          </motion.p>
        </div>
      </div>

      {/* Animated border elements with Framer Motion */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Top border */}
        <motion.div
          className="absolute left-0 top-0 h-[2px] bg-main "
          variants={topBorderVariants}
          initial="initial"
          animate={isHovered ? "animate" : "initial"}
          transition={{
            duration: 0.7,
            ease: "easeOut",
            delay: 0,
          }}
        />

        {/* Left border */}
        <motion.div
          className="absolute left-0 top-0 w-[4px] bg-main"
          variants={leftBorderVariants}
          initial="initial"
          animate={isHovered ? "animate" : "initial"}
          transition={{
            duration: 0.7,
            ease: "easeOut",
            delay: 0.1,
          }}
        />

        {/* Bottom border */}
        <motion.div
          className="absolute bottom-0 right-0 h-[4px] bg-main"
          variants={bottomBorderVariants}
          initial="initial"
          animate={isHovered ? "animate" : "initial"}
          transition={{
            duration: 0.7,
            ease: "easeOut",
            delay: 0.2,
          }}
        />

        {/* Right border */}
        <motion.div
          className="absolute bottom-0 right-0 w-[4px] bg-main"
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
    </motion.div>
  );
};

export default ServiceCard;
