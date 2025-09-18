"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { LogoProps } from "../types/navbar.types";

export default function Logo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2 sm:gap-3", className)}>
      <Image
        src="/assets/fullLogo.png"
        alt="المحكمة العليا"
        width={150}
        height={0}
        className="w-[80px] sm:w-[120px]"
        priority
      />
      <div className="hidden h-[40px] w-[2px] bg-main sm:block" />
      <Image
        src="/assets/shortLogoY.png"
        alt="شعار المحكمة"
        width={50}
        height={0}
        className="w-[25px] sm:w-[40px]"
      />
    </div>
  );
}
