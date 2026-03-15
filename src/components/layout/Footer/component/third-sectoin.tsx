import { Button } from "@/components/ui/button";
import { FaFacebookF } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";
import { IoMdCopy } from "react-icons/io";
import { MdOutlineMail } from "react-icons/md";
import { SiMessenger } from "react-icons/si";

const ThirdSectoin = () => {
  return (
    <div className="w-full">
      <div className="mb-6 text-right">
        <h2 className="mb-8 text-2xl font-bold text-main">
          اشترك في نشرة أخبار الموقع
        </h2>
        <p className="text-md leading-relaxed text-gray-300">
          سجل بريدك الإلكتروني لاستقبال إشعارات فورية بتحديثات الموقع والموضوعات
          الجديدة.
        </p>
      </div>
      {/* Email Input Form */}
      <div className="mb-6 flex">
        <div className="flex w-full max-w-[400px] items-center gap-0 overflow-hidden rounded-md border border-white/10 bg-white/10 focus-within:ring-1 focus-within:ring-main">
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            className="flex-1 bg-transparent px-4 py-2 text-right text-white placeholder-white/50 focus:outline-none"
            style={{ direction: "rtl" }}
          />
          <Button type="submit" className="shrink-0 rounded-none">
            اشترك
          </Button>
        </div>
      </div>
      <h3 className="mb-8 mt-16 text-xl font-semibold text-main">
        شارك هذه الصفحة عبر:
      </h3>
      <div className="flex w-full gap-8 flex-row-reverse justify-end">
        <IoMdCopy size={"35px"} />
        <MdOutlineMail size={"35px"} />
        <FaWhatsapp size={"35px"} />
        <SiMessenger size={"35px"} />
        <FaFacebookF size={"35px"} />
      </div>
    </div>
  );
};

export default ThirdSectoin;
