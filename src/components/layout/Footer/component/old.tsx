const FirstSectoin = () => {
  return (
    <div className="flex w-full justify-start">
      <div
        className="relative h-[450px] w-full max-w-[80%]"
        style={{
          backgroundImage: "url('/assets/bg-1.jpg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 m-[10px]">
          <div className="absolute inset-0 bg-[#F9F7F6]/70"></div>
          {/* <Image
            src={'/assets/orcode.svg'}
            alt="qrcode"
            width={200}
            height={200}
            className="absolute left-1/2 h-[260px] w-[100%] -translate-x-1/2 transform"
          /> */}
          <div className="absolute bottom-10 right-5">
            <div className="relative">
              <h2
                className="-mb-10 flex items-center bg-clip-text text-2xl font-bold text-transparent"
                style={{
                  backgroundImage: "url('/assets/bg-1.jpg')",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  WebkitBackgroundClip: "text",
                }}
              >
                <span className="font-Alkalami bg-clip-text text-[140px] font-bold text-transparent">
                  71
                </span>
                <span className="mt-[20px]">ﻋﺎﻣﺎً،</span>
              </h2>
            </div>
            <p className=" text-md text-black">
              رقيبا علي التطبيق الصحيح <br />
              للقانون
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstSectoin;
