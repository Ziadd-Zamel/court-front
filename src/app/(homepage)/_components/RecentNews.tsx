"use client";
import AnimatedSectionHeader from "@/components/common/AnimatedSectionHeader";
import { motion } from "framer-motion";
import { useState } from "react";
import StaggeredNavigationCarousel from "./TestimonialCarousel";

interface Testimonial {
  title: string;
  text: string;
  desc: string;
}

const RecentNews = () => {
  const [SelectedNew, setSelectedNew] = useState<Testimonial | null>({
    title: "المحكمة العليا",
    text: "إعلان استئناف عمل الدائرة الدستورية بالمحكمة",
    desc: "ضافة حزمة من الكتب في مختلف فروع القانون بتاريخ 20-4-2025 تشمل أكثر من 150 عنواناً في القانون المدني والجنائي والدستوري والإداري. ضافة حزمة من الكتب في مختلف فروع القانون بتاريخ 20-4-2025 تشمل أكثر من 150 عنواناً في القانون المدني والجنائي والدستوري والإداري. ضافة حزمة من الكتب في مختلف فروع القانون بتاريخ 20-4-2025 تشمل أكثر من 150 عنواناً في القانون المدني والجنائي والدستوري والإداري.",
  });

  const handleCardClick = (testimonial: Testimonial) => {
    setSelectedNew(testimonial);
  };

  return (
    <section className="py-16 bg-main/10">
      <AnimatedSectionHeader
        title="أنشطة المحكمة العليا"
        textClassName="text-black!"
      />
      <div className="mt-7 flex flex-col items-center justify-center lg:flex-row box-container ">
        <div className="flex w-full flex-col items-start text-right lg:w-[50%]">
          <div className="flex w-full text-right">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
            >
              <StaggeredNavigationCarousel onCardClick={handleCardClick} />
            </motion.div>
          </div>
          <p className=" cursor-pointer pl-[15px] text-left text-lg font-bold text-main">
            اطلع على كل الأنشطة
          </p>
        </div>
        <div className="mb-20 w-full lg:mt-0 lg:w-[50%]">
          <motion.div
            className=" w-full border h-[380px] bg-white px-7 py-5 shadow-lg"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {SelectedNew && (
              <motion.div
                className="flex min-h-[120px] w-full cursor-pointer flex-col space-y-2 rounded-md bg-white text-right"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <div className="flex flex-row items-end gap-2 pt-3">
                  <h6 className=" text-main">{SelectedNew.text}:</h6>
                </div>
                <p className="text-sm indent-5 text-justify leading-7 text-gray-500 mt-5">
                  {SelectedNew.desc}
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RecentNews;
