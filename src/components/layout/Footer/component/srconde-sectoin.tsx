import { FaLocationDot } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa";

import { MdOutlineMail } from "react-icons/md";
const SecondeSectoin = () => {
  return (
    <div className="flex w-full flex-col items-stretch max-sm:items-end sm:items-center">
      <div className="flex w-full flex-col justify-start gap-4 max-sm:gap-3 sm:gap-5">
        <h2 className="mb-3 text-right text-lg font-bold text-main sm:mb-5 sm:text-2xl">
          الاتصال
        </h2>
        <h4 className="text-right text-sm font-medium text-main sm:text-lg">
          طرابلس
        </h4>
        <div className="flex items-center gap-3">
          <FaLocationDot className="shrink-0 text-sm text-main sm:text-base" />
          <p className="text-xs sm:text-base">طرابلس – زاوية الدهماني</p>
        </div>
        <div className="flex items-center gap-3">
          <FaPhone className="shrink-0 text-sm text-main sm:text-base" />
          <p style={{ direction: "ltr" }} className="mr-1.5 text-xs sm:text-base">
            +218-21-3403725/27
          </p>
        </div>
      </div>
      <div className="mt-6 flex w-full flex-col justify-start gap-4 max-sm:mr-0 max-sm:gap-3 sm:mt-8 sm:gap-5 sm:-mr-6">
        <h4 className="text-right text-sm font-medium text-main sm:text-lg">
          بنغازي
        </h4>
        <div className="flex items-center gap-3">
          <FaLocationDot className="shrink-0 text-sm text-main sm:text-base" />
          <p className="text-xs sm:text-base">شارع رفيق المهدوي</p>
        </div>
        <div className="flex items-center gap-3">
          <FaPhone className="shrink-0 text-sm text-main sm:text-base" />
          <p style={{ direction: "ltr" }} className="mr-1.5 text-xs sm:text-base">
            +218-61-9090690{" "}
          </p>
        </div>
        <div className="mt-6 flex items-center gap-3 sm:mt-[80px]">
          <MdOutlineMail className="shrink-0 text-sm text-main sm:text-base" />
          <p style={{ direction: "ltr" }} className="mr-1.5 text-xs sm:text-base">
            seen@alolya.gov.ly{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SecondeSectoin;
