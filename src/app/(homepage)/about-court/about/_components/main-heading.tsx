"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import CustomBreadcrumb from "@/components/common/custom-breadcrumb";
import FootrLogo from "@/components/layout/Footer/component/FotterLogo";

interface Props {
  bgImage: string;
  overlay?: boolean;
}

export default function MainHeading({ bgImage, overlay }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={ref}
      className="relative w-full h-fit pb-10 sm:pb-20 overflow-hidden"
    >
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

      {overlay && <div className="absolute inset-0 bg-black/50 z-10" />}

      {/**Content container */}
      <div className="relative flex flex-col box-container z-20 gap-8 mt-32">
        {/** Title with Breadcrumb */}
        <div className="flex gap-10 sm:gap-0 sm:flex-row flex-col-reverse w-full max-w[80%] items-start justify-between">
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className={cn(
              "text-3xl sm:text-5xl font-bold text-white self-start"
            )}
          >
            <FootrLogo />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="self-end"
          >
            <CustomBreadcrumb />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
