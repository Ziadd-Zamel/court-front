"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function NavigationLoader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const prevPathRef = useRef<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (prevPathRef.current === null) {
      prevPathRef.current = pathname;
      return;
    }

    if (prevPathRef.current !== pathname) {
      setVisible(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setVisible(false), 800);
    }

    prevPathRef.current = pathname;

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [pathname]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center bg-background/95 backdrop-blur-sm"
      role="status"
      aria-live="polite"
      aria-label="جاري التحميل"
    >
      <div className="flex flex-col items-center gap-6">
        <div className="relative flex size-36 items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-main/20" />
          <div className="absolute inset-2 animate-spin rounded-full border-2 border-transparent border-t-main border-r-main/60" />
          <div className="absolute inset-5 animate-ping rounded-full bg-main/10" />
          <div className="relative flex size-24 items-center justify-center rounded-full bg-white shadow-2xl shadow-main/20 dark:bg-zinc-950">
            <Image
              src="/assets/shortLogoY.jpg"
              alt="شعار المحكمة العليا"
              width={72}
              height={72}
              priority
              className="h-16 w-16 animate-pulse object-contain"
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 text-center">
          <p className="font-zain text-xl font-bold text-main">جاري التحميل</p>
          <div className="flex items-center gap-2" aria-hidden="true">
            <span className="size-2 animate-bounce rounded-full bg-main [animation-delay:-0.3s]" />
            <span className="size-2 animate-bounce rounded-full bg-main [animation-delay:-0.15s]" />
            <span className="size-2 animate-bounce rounded-full bg-main" />
          </div>
        </div>
      </div>
    </div>
  );
}
