import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex items-center gap-5">
      <Image
        className="w-[120px]"
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
        className="w-[250px]"
      />
    </div>
  );
};

export default Logo;
