/* eslint-disable react/no-unescaped-entities */
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const HeroSlides4 = () => {
  const router = useRouter();

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex w-full flex-col items-center justify-center">
        <div className="flex w-full flex-col items-center justify-center">
          <motion.h1
            className="font-zain text-5xl font-extrabold lg:text-7xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeInOut", delay: 0.2 }}
          >
            المبادئ القانونية
          </motion.h1>

          <motion.div
            className="mb-3 mt-2 h-[1px] w-[320px] bg-main_orang sm:w-[500px]"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 1.2 }}
          />
          <div className="mt-5 flex w-full flex-col items-center justify-center">
            <motion.p
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.1, delay: 0.8 }}
              className="-mt-2 text-center font-zain text-lg text-white lg:text-2xl"
            >
              قواعد أرستها المحكمة العليا في قضايا{" "}
            </motion.p>
            <motion.p
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.1, delay: 0.8 }}
              className="mt-2 text-center font-zain text-lg text-main lg:text-2xl"
            >
              الأحوال الشخصية – النقض الإداري – النقض المدني – النقض الجنائي-
              الدوائر مجتمعة{" "}
            </motion.p>

            <motion.button
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.1, delay: 0.4 }}
              className="mt-3 w-[130px] rounded-sm bg-main_orang py-2 text-white hover:bg-main_orang"
              onClick={() => router.push("/legal-principles")}
            >
              دخول
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSlides4;
