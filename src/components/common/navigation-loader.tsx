"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { CourtLoadingScreen } from "./court-eclipse-loader";

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

  return <CourtLoadingScreen />;
}
