import FirstSectoin from "@/components/layout/Footer/component/first-sectoin";
import SecondeSectoin from "@/components/layout/Footer/component/srconde-sectoin";
import ThirdSectoin from "@/components/layout/Footer/component/third-sectoin";
import FootrLogo from "./component/FotterLogo";

const Footer = () => {
  return (
    <footer className="relative h-fit w-full border-t-[3px] border-solid border-main bg-[url('/assets/h-main-new-slide-3.jpg')] bg-cover bg-center bg-no-repeat text-white">
      <div className="absolute inset-0 h-[100%] bg-black/90" />
      <div className="relative z-10 flex min-h-screen flex-col ">
        <div className="box-container py-10">
          <FootrLogo />
        </div>

        {/* Updated grid with equal space distribution */}
        <div className="grid grid-cols-12 gap-4 md:gap-8 lg:gap-16 box-container ">
          <div className="col-span-12 md:col-span-6 lg:col-span-4 w-full">
            <FirstSectoin />
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-4 w-full lg:-mr-8">
            <SecondeSectoin />
          </div>
          <div className="col-span-12  lg:col-span-4 w-full">
            <ThirdSectoin />
          </div>
        </div>
        {/* الفوتر السفلي */}
        <div className="mt-[50px] justify-self-start bg-black py-5">
          <div
            style={{ direction: "rtl" }}
            className="text-center font-zain text-[14px] font-[300] text-white"
          >
            <p className="font-zain">
              ﺟﻤﻴﻊ الحقوق ﻣﺤﻔﻮﻇﺔ،{" "}
              <span className="font-semibold text-white">المحكمة العليا</span>،
              2025
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
