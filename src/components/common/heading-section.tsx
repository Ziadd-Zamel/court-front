"use client";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import CustomBreadcrumb from "./custom-breadcrumb";
import { useRef } from "react";

interface Props {
  title: string;
  bgImage: string;
  description?: string;
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
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative w-full h-[50vh] overflow-hidden">
      {/* Background Image with parallax effect */}
      <motion.div style={{ y, scale }} className="absolute inset-0 z-0">
        <Image
          src={bgImage}
          alt="background-Image"
          fill
          priority
          className="object-cover"
        />
      </motion.div>

      {overlay && (
        <motion.div
          style={{ opacity }}
          className="absolute inset-0 bg-black/50 z-10"
        />
      )}

      {/** Content container */}
      <motion.div
        style={{ opacity: useSpring(opacity, { stiffness: 100, damping: 30 }) }}
        className="relative flex flex-col box-container z-20 gap-8"
      >
        {/** Title with Breadcrumb */}
        <div className="flex w-full max-w[80%] items-center justify-between">
          <motion.h2
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className={cn(
              titleClassName,
              "text-3xl sm:text-5xl font-bold text-white"
            )}
          >
            {title}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <CustomBreadcrumb />
          </motion.div>
        </div>

        {/** Description */}
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className={cn(
              descriptionClassname,
              "font-normal leading-7 text-gray-300 sm:text-lg md:text-xl max-w-[80%]"
            )}
          >
            {description}
          </motion.p>
        )}
      </motion.div>
    </section>
  );
}
