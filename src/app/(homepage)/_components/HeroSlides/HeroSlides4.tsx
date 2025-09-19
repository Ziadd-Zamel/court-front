import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const HeroSlides4 = () => {
  const router = useRouter();

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex w-full flex-col items-center justify-center">
        <div className="flex w-full flex-col items-center justify-center">
          <motion.h1
            className="text-2xl sm:text-5xl font-extrabold lg:text-6xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            المبادئ القانونية
          </motion.h1>

          <motion.div
            className="mb-3 mt-2 h-[1px] w-[320px] bg-main sm:w-[500px]"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.6 }}
          />
          <div className="mt-5 flex w-full flex-col items-center justify-center">
            <motion.p
              className="-mt-2 text-center text-xs sm:text-lg text-white lg:text-2xl"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.8 }}
            >
              قواعد أرستها المحكمة العليا في قضايا{" "}
            </motion.p>
            <motion.p
              className="mt-2 text-center text-xs sm:text-lg text-main lg:text-2xl"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 1.0 }}
            >
              الأحوال الشخصية – النقض الإداري – النقض المدني – النقض الجنائي-
              الدوائر مجتمعة{" "}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 1.2 }}
            >
              <Button
                className="py-1 sm:py-2 px-10 mt-5"
                onClick={() => router.push("/legal-principles")}
              >
                دخول
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSlides4;
