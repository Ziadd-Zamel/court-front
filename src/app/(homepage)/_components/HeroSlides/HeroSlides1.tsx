/* eslint-disable react/no-unescaped-entities */
import { motion } from "framer-motion";
import Image from "next/image";

const HeroSlides1 = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center box-container">
      <div className="relative flex w-full">
        <Image
          src={"/assets/BasmAyah.png"}
          alt="Aya"
          width={400}
          height={0}
          className="absolute -top-24 w-[250px] sm:w-[350px] lg:-top-36 left-1/2 -translate-x-1/2"
        />
        <div className="flex w-full flex-col items-center justify-center">
          <motion.h1
            className=" text-3xl sm:text-5xl font-bold lg:text-5xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            المحكمة العليا
          </motion.h1>
          <motion.p
            className=" text-lg sm:text-2xl lg:text-3xl mt-3"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.6 }}
          >
            قمّة هرم السّلطة القضائيّة في ليبيا
          </motion.p>

          <motion.div
            className="my-3 h-[1px] w-[250px] bg-main sm:w-[550px]"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.8 }}
          />
          <motion.p
            className="text-center text-xs sm:text-sm text-main lg:text-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 1 }}
          >
            "المبادئ القانونية التي تقرّرها المحكمة العليا في أحكامها ملزمةٌ
            لجميع المحاكم وكافّة الجهات الأخرى في ليبيا"
          </motion.p>
          <motion.p
            className="mt-4 text-sm text-white lg:text-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 1.2 }}
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
