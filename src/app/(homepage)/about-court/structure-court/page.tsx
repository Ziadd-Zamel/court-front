import SecondaryHeading from "@/components/common/seondary-heading";
import Image from "next/image";

export default function page() {
  return (
    <section className="flex flex-col">
      <SecondaryHeading title="sda" breadcrumb />
      <div className="w-full flex items-center justify-center min-h-screen py-20">
        <Image
          src={"/assets/structure.png"}
          alt="alt"
          width={1000}
          height={3000}
        />
      </div>
    </section>
  );
}
