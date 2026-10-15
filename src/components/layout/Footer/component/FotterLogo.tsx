import Image from "next/image";

const FootrLogo = () => {
  return (
    <div className="flex items-center gap-5">
      <Image
        className="w-[80px] max-[360px]:w-[64px]"
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
        className="w-[200px] max-[360px]:w-[160px]"
      />
    </div>
  );
};

export default FootrLogo;
