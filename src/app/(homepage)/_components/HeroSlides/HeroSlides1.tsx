/* eslint-disable react/no-unescaped-entities */
import { motion } from "framer-motion";
import Image from "next/image";

const HeroSlides1 = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="relative flex w-full flex-col items-center justify-center">
        <Image
          src={"/assets/BasmAyah.png"}
          alt="Aya"
          width={400}
          height={0}
          className="absolute -top-32 w-[300px] sm:w-[400px] lg:-top-32"
        />
        <div className="flex w-full flex-col items-center justify-center">
          <motion.h1
            className="font-zain text-5xl font-extrabold lg:text-7xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeInOut", delay: 0.2 }}
          >
            المحكمة العليا
          </motion.h1>
          <motion.p
            className="-mt-3 font-zain text-2xl lg:text-4xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeInOut", delay: 0.4 }}
          >
            قمّة هرم السّلطة القضائيّة في ليبيا
          </motion.p>

          <motion.div
            className="my-3 h-[1px] w-[320px] bg-main_orang sm:w-[550px]"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 1.2 }}
          />
          <motion.p
            className="text-center font-zain text-sm text-main lg:text-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 1.4 }}
          >
            "المبادئ القانونية التي تقرّرها المحكمة العليا في أحكامها ملزمةٌ
            لجميع المحاكم وكافّة الجهات الأخرى في ليبيا"
          </motion.p>
          <motion.p
            className="mt-4 font-zain text-sm text-white lg:text-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 1.6 }}
          >
            {" "}
            المادة 31 من قانون المحكمة العليا
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default HeroSlides1;
