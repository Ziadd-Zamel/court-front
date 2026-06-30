import Image from "next/image";
import { cn } from "@/lib/utils";

const LOADER_SRC = "/assets/mainloader.svg";

type CourtEclipseLoaderProps = {
  size?: number;
  logoSize?: number;
  showLabel?: boolean;
  label?: string;
  className?: string;
};

export function CourtEclipseLoader({
  size = 128,
  logoSize = 44,
  showLabel = true,
  label = "جاري التحميل",
  className,
}: CourtEclipseLoaderProps) {
  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <div
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <img
          src={LOADER_SRC}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-contain"
        />

        <div className="relative z-10 flex items-center justify-center">
          <Image
            src="/assets/shortLogoY.png"
            alt="شعار المحكمة العليا"
            width={logoSize}
            height={logoSize}
            priority
            className="object-contain"
            style={{ width: logoSize, height: logoSize }}
          />
        </div>
      </div>

      {showLabel ? (
        <p className="font-zain text-lg font-bold text-main">{label}</p>
      ) : null}
    </div>
  );
}

export function CourtLoadingScreen({
  label = "جاري التحميل",
}: {
  label?: string;
}) {
  return (
    <div
      className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center bg-background/95 backdrop-blur-sm"
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <CourtEclipseLoader label={label} />
    </div>
  );
}
