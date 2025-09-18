import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const HeroSlides3 = () => {
  const router = useRouter();

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex w-full flex-col items-center justify-center">
        <div className="relative">
          <motion.p
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.1, delay: 1 }}
            className="text-center font-zain text-5xl font-extrabold lg:text-6xl"
          >
            بوابة{" "}
          </motion.p>
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.1, delay: 1 }}
            className="-mt-3 text-center font-zain text-4xl font-extrabold lg:text-6xl"
          >
            المتقاضين والقانونيين{" "}
          </motion.h1>

          <div className="mt-5 flex w-full flex-col items-center justify-center">
            <motion.p
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.1, delay: 0.8 }}
              className="-mt-2 text-center font-zain text-lg text-main lg:text-2xl"
            >
              الاستعلام عن طعن – معلومات مهمة – المحامون المقبولون – خدمات
              الطباعة{" "}
            </motion.p>

            <motion.button
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.1, delay: 0.4 }}
              className="mt-3 w-[130px] rounded-sm bg-main py-2 text-white hover:bg-main"
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

export default HeroSlides3;
