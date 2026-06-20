import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-5">
      <Image
        className="w-[100px] sm:w-[110px]"
        src="/assets/shortLogoY.png"
        alt="شعار ليبرو"
        width={400}
        height={0}
      />
      <Image
        src="/assets/SnalFullLongLogo.png"
        alt="شعار ليبرو"
        width={300}
        height={0}
        className="w-[190px] sm:w-[220px] md:w-[300px]"
      />
    </div>
  );
};

export default Logo;
