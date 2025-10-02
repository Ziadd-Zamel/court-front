import { FaLocationDot } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa";

import { MdOutlineMail } from "react-icons/md";
const SecondeSectoin = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex flex-col justify-start gap-5">
        <h2 className="mb-5 text-4xl font-bold text-main text-right">
          الاتصال
        </h2>
        <h4 className="text-main font-medium text-2xl">طرابلس</h4>
        <div className="flex items-center gap-3">
          <FaLocationDot className="text-main" />
          <p className="text-xl">طرابلس – زاوية الدهماني</p>
        </div>
        <div className="flex items-center gap-3">
          <FaPhone className="text-main" />
          <p style={{ direction: "ltr" }} className="text-xl mr-1.5">
            +218-21-3403725/27
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-start mt-8 gap-5">
        <h4 className="text-main font-medium text-2xl">بنغازي</h4>
        <div className="flex items-center gap-3">
          <FaLocationDot className="text-main" />
          <p className="text-xl">شارع رفيق المهدوي</p>
        </div>
        <div className="flex items-center gap-3">
          <FaPhone className="text-main" />
          <p style={{ direction: "ltr" }} className="text-xl mr-1.5">
            +218-61-9090690{" "}
          </p>
        </div>
        <div className="flex items-center gap-3 mt-[80px]">
          <MdOutlineMail className="text-main" />
          <p style={{ direction: "ltr" }} className="text-xl mr-1.5">
            seen@alolya.gov.ly{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SecondeSectoin;
