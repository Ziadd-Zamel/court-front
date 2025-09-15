"use client";
import AnimatedSectionHeader from "@/components/common/AnimatedSectionHeader";
import { motion } from "framer-motion";

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
    <section className="relative z-20 w-full pb-16 pt-12">
      <div className=" box-container">
        <div className="mb-5">
          <AnimatedSectionHeader
            title=" أحدث الأحكام والموضوعات"
            subtitle=" المرفوعة إلى مختلف فروع الموقع"
            textClassName="text-white"
          />
        </div>

        <motion.div
          className="flex w-full flex-wrap justify-center gap-5 pt-10"
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
    </section>
  );
};

type PracticeCardProps = {
  title: string;
  description: string;
  Icon: React.ComponentType<{ className?: string }>;
};
const PracticeCard = ({ title, description, Icon }: PracticeCardProps) => {
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
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div>
      <div className="service-card group relative h-36 cursor-pointer overflow-hidden bg-[#bfb0854c] p-2 transition-all duration-500 sm:h-40 sm:max-w-[350px] sm:p-4 xl:max-w-[320px]">
        <div
          style={{ direction: "rtl" }}
          className="relative z-10 flex items-start gap-5"
        >
          <div className="z-20 flex">
            <Icon className="mx-auto mt-[40px] size-6 text-main sm:size-8" />
          </div>{" "}
          <div className="flex flex-col items-end">
            <h3
              style={{ direction: "rtl" }}
              className="mb-2 font-zain text-lg font-normal text-white transition-all duration-500"
            >
              {title}
            </h3>
            <div className="h-[2px] w-[30px] bg-main_orang" />

            <p
              style={{ direction: "rtl" }}
              className="mt-3 min-h-6 font-zain text-xs font-normal text-gray-300 transition-all duration-500 sm:text-[16px]"
            >
              {description}
            </p>
          </div>
        </div>

        {/* Border animation elements (unchanged) */}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="animate-border-top absolute left-0 top-0 h-[2px] w-0 bg-main_orang"></div>
          <div className="animate-border-left absolute left-0 top-0 h-0 w-[2px] bg-main_orang"></div>
          <div className="animate-border-bottom absolute bottom-0 right-0 h-[2px] w-0 bg-main_orang"></div>
          <div className="animate-border-right absolute bottom-0 right-0 h-0 w-[2px] bg-main_orang"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default PracticeAreasv3;
