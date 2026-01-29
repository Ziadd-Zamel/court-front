import Image from "next/image";

const FirstSectoin = () => {
  return (
    <div className="flex w-full justify-start">
      <div
        className="relative h-[550px] w-full max-w-[300px]"
        style={{
          backgroundImage: "url('/assets/orbd.jpg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 m-[10px]">
          {/*  */}
          <div className="absolute inset-0 bg-white"></div>
          <Image
            src={"/assets/QR2.svg"}
            alt="qrcode"
            width={200}
            height={200}
            className="absolute left-1/2 top-5 h-[200px] w-[200px] -translate-x-1/2 transform"
          />
          <div className="absolute bottom-14 right-5">
            <div className="w-fit">
              <div className="relative">
                <p className="text-[140px] text-black font-merriweather font-extrabold -mt-5">
                  73
                </p>
                <span className="absolute top-[135px] text-xl font-bold -left-10 text-black">
                  عاماً
                </span>
              </div>
            </div>
            <p className=" text-md text-black -mb-10">
              رقيباً علي التطبيق الصحيح للقانون
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstSectoin;
