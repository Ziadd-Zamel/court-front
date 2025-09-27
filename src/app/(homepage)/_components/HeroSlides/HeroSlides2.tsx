import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Arabic71Component from "./Arabic71Component";
import { Button } from "@/components/ui/button";

const HeroSlides2 = () => {
  const router = useRouter();

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex w-full flex-col items-center justify-center">
        <div className="relative">
          <motion.div
            className="absolute right-5 top-[75px]  lg:-right-5"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.2 }}
          >
            <Arabic71Component />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center text-2xl font-extrabold sm:text-5xl lg:text-6xl"
          >
            الدائرة الدستوريّة بالمحكمة العليا
          </motion.h1>

          <div className="mt-4 flex w-full flex-col items-center justify-center lg:mt-8">
            <div className="mr-28">
              <motion.p
                className="mt-2 text-start text-xs sm:text-lg lg:text-2xl"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8 }}
              >
                ذائداً عن حوزة القانون الدّستوري
              </motion.p>

              <motion.p
                className="mt-2 text-start text-xs sm:text-lg lg:text-2xl"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.2 }}
              >
                ضامناً لبقاء الشرعيّة الدستوريّة في مدارجها العليا
              </motion.p>
            </div>
            <Button
              className="py-1 sm:py-2 px-10 mt-5"
              onClick={() => router.push("/litigants-lawyers-portal")}
            >
              دخول
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSlides2;
