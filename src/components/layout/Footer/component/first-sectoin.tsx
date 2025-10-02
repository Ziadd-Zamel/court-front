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
            className="absolute left-1/2 h-[250px] w-[90%] -translate-x-1/2 transform"
          />
          <div className="absolute bottom-16 right-5">
            <div className="relative">
              <h2
                className=" flex items-center bg-clip-text text-2xl font-bold text-transparent"
                style={{
                  backgroundImage: "url('/assets/bg-1.jpg')",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  WebkitBackgroundClip: "text",
                }}
              >
                <span className="font-merriweather font-extrabold bg-clip-text text-[140px]  text-transparent">
                  73
                </span>
                <span className="mt-[85px]">ﻋﺎﻣﺎً،</span>
              </h2>
            </div>
            <p className=" text-md text-black -mb-10">
              رقيبا علي التطبيق الصحيح للقانون
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstSectoin;
