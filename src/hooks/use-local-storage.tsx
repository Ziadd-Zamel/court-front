/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";

export function useLocalStorageArray<T>(key: string) {
  const [items, setItems] = useState<T[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load on mount
    const stored = localStorage.getItem(key);
    if (stored) {
      setItems(JSON.parse(stored));
    }
    setIsLoaded(true);
  }, [key]);

  useEffect(() => {
    // Only save AFTER initial load is complete
    if (isLoaded) {
      localStorage.setItem(key, JSON.stringify(items));
    }
  }, [key, items, isLoaded]);

  // ✅ Toggle: if exists remove, if not add
  const toggleItem = (item: T, idField: string) => {
    setItems((prev) => {
      const itemId = (item as any)[idField];
      const exists = prev.some((i: any) => i[idField] === itemId);

      if (exists) {
        // Remove it - keep items that DON'T match this ID
        return prev.filter((i: any) => i[idField] !== itemId);
      } else {
        // Add it
        return [...prev, item];
      }
    });
  };

  const clearItems = () => setItems([]);

  return { items, toggleItem, clearItems };
}
