"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants/routes";
import { MenuOverlayProps } from "../types/navbar.types";

export default function MenuOverlay({
  isOpen,
  onClose,
  openSubmenuIndex,
  onToggleSubmenu,
}: MenuOverlayProps) {
  const router = useRouter();

  const handleItemClick = (item: (typeof ROUTES)[0], index: number) => {
    if (item.children) {
      onToggleSubmenu(index);
    } else if (item.path) {
      router.push(item.path);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[50] bg-black/80 pb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <div className="flex h-full flex-col items-center justify-center">
            <motion.div
              className="text-white"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <ul className="flex flex-col items-center justify-center space-y-6">
                {ROUTES.map((item, index) => (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, x: "-100%" }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: "-100%" }}
                    transition={{
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 100,
                      damping: 20,
                    }}
                    className="relative cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleItemClick(item, index);
                    }}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <p
                        className="font-normal text-2xl transition-colors hover:text-main"
                        onClick={(e) => {
                          if (item.children) {
                            e.preventDefault();
                          }
                        }}
                      >
                        {item.name}
                      </p>
                    </div>

                    {/* Submenu */}
                    <AnimatePresence>
                      {item.children && openSubmenuIndex === index && (
                        <motion.ul
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-2 space-y-4 overflow-hidden"
                        >
                          {item.children.map((subItem) => (
                            <motion.li
                              key={subItem.name}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                            >
                              <Link
                                href={subItem.path}
                                className="font-arabic flex items-center justify-center gap-2 text-end text-[20px] font-[400] text-gray-300 transition-colors hover:text-main"
                                onClick={onClose}
                              >
                                {subItem.name}
                              </Link>
                            </motion.li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
