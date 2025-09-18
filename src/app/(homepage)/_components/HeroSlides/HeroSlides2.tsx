import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Arabic71Component from "./Arabic71Component";

const HeroSlides2 = () => {
  const router = useRouter();

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex w-full flex-col items-center justify-center">
        <div className="relative">
          <div className="absolute -right-0 top-[75px] sm:-right-7 lg:-right-16">
            <Arabic71Component />
          </div>

          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.1, delay: 0.8 }}
            className="text-center font-zain text-2xl font-extrabold sm:text-4xl lg:text-[60px]"
          >
            الدائرة الدستوريّة بالمحكمة العليا
          </motion.h1>

          <div className="mt-4 flex w-full flex-col items-start justify-center lg:mt-8">
            <div>
              <motion.p
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.1, delay: 0.6 }}
                className="mt-2 text-end font-zain text-[11px] sm:text-lg lg:text-2xl"
              >
                ذائداً عن حوزة القانون الدّستوري
              </motion.p>

              <motion.p
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.1, delay: 0.4 }}
                className="mt-2 text-end font-zain text-[11px] sm:text-lg lg:text-2xl"
              >
                ضامناً لبقاء الشرعيّة الدستوريّة في مدارجها العليا
              </motion.p>
            </div>

            <motion.button
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.1, delay: 0 }}
              className="mt-7 w-[130px] self-center rounded-md bg-main py-2 text-white hover:bg-main"
              onClick={() => router.push("/litigants-lawyers-portal")}
            >
              دخول
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSlides2;
