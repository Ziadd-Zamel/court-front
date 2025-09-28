"use client";
import AnimatedSectionHeader from "@/components/common/AnimatedSectionHeader";
import { motion } from "framer-motion";
import { useState } from "react";

interface Area {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface PracticeAreasv3Props {
  areas: Area[];
}

const PracticeAreasv3 = ({ areas }: PracticeAreasv3Props) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <section
      className="w-full pb-16 pt-12 relative"
      style={{
        backgroundImage: `url('/assets/1.675d21b24af6dbaafa5a.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-[#151a30a6]" />

      <div className=" box-container">
        <div className="mb-5">
          <AnimatedSectionHeader
            title=" أحدث الأحكام والموضوعات"
            subtitle=" المرفوعة إلى مختلف فروع الموقع"
            textClassName="text-white"
          />
        </div>
        <div className="flex w-full justify-center">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-5 pt-10"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            {areas.map((area, index) => (
              <PracticeCard
                key={index}
                title={area.title}
                description={area.description}
                Icon={area.icon}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

type PracticeCardProps = {
  title: string;
  description: string;
  Icon: React.ComponentType<{ className?: string }>;
};
const PracticeCard = ({ title, description, Icon }: PracticeCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

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
              <Icon className="size-6 text-main sm:size-8" />
            </div>{" "}
            <p className="mt-3 min-h-6 text-xs font-normal text-gray-300 transition-all duration-500 sm:text-[16px]">
              {description}
            </p>
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

          {/* Left border */}
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

          {/* Bottom border */}
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

          {/* Right border */}
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
    </motion.div>
  );
};

export default PracticeAreasv3;
