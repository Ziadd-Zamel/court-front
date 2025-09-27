import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const HeroSlides3 = () => {
  const router = useRouter();

  return (
    <div className="flex h-screen w-full items-center justify-center box-container">
      <div className="flex w-full flex-col items-center justify-center">
        <div className="relative">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center text-2xl sm:text-5xl font-extrabold lg:text-6xl"
          >
            <div className="flex flex-col items-center justify-center gap-2">
              <span className="mb-3">بوابة</span>
              <span>المتقاضين والقانونيين</span>
            </div>
          </motion.h1>

          <div className="mt-7 flex w-full flex-col items-center justify-center">
            <motion.p
              className="-mt-2 text-center text-xs sm:text-lg text-main lg:text-2xl"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.6 }}
            >
              الاستعلام عن طعن – معلومات مهمة – المحامون المقبولون – خدمات
              الطباعة{" "}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.8 }}
            >
              <Button
                className="py-1 sm:py-2 px-10 mt-5"
                onClick={() => router.push("/litigants-lawyers-portal")}
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

export default HeroSlides3;
