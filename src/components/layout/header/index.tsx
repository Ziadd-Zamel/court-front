/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CiFolderOn } from "react-icons/ci";
import { IoSearchOutline } from "react-icons/io5";
import { TfiClose } from "react-icons/tfi";
import BurgerMenu from "./_components/BurgerMenu";
import { ROUTES } from "@/lib/constants/routes";
import { Button } from "@/components/ui/button";

interface Props {
  opacity?: boolean;
}

const Navbar = ({ opacity = false }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [openSubmenuIndex, setOpenSubmenuIndex] = useState<number | null>(null);
  const [visible, setVisible] = useState<boolean>(true);
  const [prevScrollPos, setPrevScrollPos] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const route = useRouter();

  useEffect(() => {
    if (isMenuOpen || isSearchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMenuOpen, isSearchOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      // Make navbar visible if scrolling up or at the top
      // Hide navbar if scrolling down and not at the top
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);

      // Set background color change when scrolled down and then back up
      setIsScrolled(currentScrollPos > 10);

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const handleOverlayClick = () => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
    setOpenSubmenuIndex(null);
  };

  const toggleSubmenu = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenSubmenuIndex(openSubmenuIndex === index ? null : index);
  };

  return (
    <motion.nav
      className={`fixed right-0 top-0 z-50 flex w-full  items-center justify-between px-3 py-3 transition-colors duration-300 sm:px-10 lg:px-20 ${
        isScrolled && visible
          ? "border-b-2 border-[#e6c599] bg-black/70 py-px"
          : !opacity
          ? "bg-black bg-opacity-0"
          : "bg-black bg-opacity-70"
      }`}
      initial={{ top: 0 }}
      animate={{
        top: visible ? 0 : "-100%",
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex  items-center gap-4">
        {!isSearchOpen && (
          <div className="relative z-50">
            <BurgerMenu onToggle={setIsMenuOpen} isMenuOpen={isMenuOpen} />
          </div>
        )}
        <Button
          onClick={() => setIsSearchOpen(true)}
          variant={"ghost"}
          className="focus:outline-none hover:bg-transparent cursor-pointer"
        >
          <IoSearchOutline className="text-[20px] text-white sm:text-[30px]" />
        </Button>
        <CiFolderOn
          onClick={() => route.push("/favorit")}
          className="cursor-pointer text-[20px] text-white sm:text-[30px]"
        />
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <Image
          src={"/assets/fullLogo.png"}
          alt="Logo"
          width={150}
          height={0}
          className="w-[80px] sm:w-[120px]"
        />
        <div className="hidden h-[40px] w-[2px] bg-main_orang sm:block" />
        <Image
          src={"/assets/shortLogoY.png"}
          alt=""
          width={50}
          height={0}
          className="w-[25px] sm:w-[40px]"
        />
      </div>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            className="fixed left-0 top-0 z-[100] flex h-full w-full items-center justify-center bg-[#001026]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleOverlayClick}
          >
            <motion.button
              className="absolute right-8 top-8 focus:outline-none"
              onClick={() => setIsSearchOpen(false)}
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.3 }}
            >
              <TfiClose className="text-[40px] text-white" />
            </motion.button>

            <motion.div
              className="relative w-full max-w-2xl px-4"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="relative">
                <input
                  dir="rtl"
                  type="text"
                  placeholder="بحث"
                  className="font-arabic w-full bg-transparent pl-12 pr-4 text-right text-4xl text-white  placeholder:text-right placeholder:text-white focus:outline-none"
                />
                <IoSearchOutline className="absolute left-0 top-1/2 -translate-y-1/2 transform text-[30px] text-white" />
                <motion.div
                  className="absolute bottom-0 right-0 h-[1px] bg-[#808893]"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Menu Overlay with Submenus */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed left-0 top-0 z-[100] h-full w-full bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleOverlayClick}
          >
            <div className="flex h-full flex-col items-center justify-center">
              <motion.div
                className="text-white"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
              >
                <ul className="flex flex-col items-center space-y-4">
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
                        item.children && toggleSubmenu(index, e);
                        if (item.path) {
                          route.push(`${item.path}`);
                        }
                      }}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <p
                          className="font-arabic text-[30px] font-[600]"
                          onClick={(e) => item.children && e.preventDefault()}
                        >
                          {item.name}
                        </p>
                      </div>

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
                                  className="font-arabic flex items-center justify-center gap-2 text-end text-[20px] font-[400] text-gray-300"
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
    </motion.nav>
  );
};

export default Navbar;
