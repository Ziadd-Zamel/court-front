"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export interface NavbarState {
  isMenuOpen: boolean;
  isSearchOpen: boolean;
  openSubmenuIndex: number | null;
  visible: boolean;
  isScrolled: boolean;
  shouldUseDarkBackground: boolean;
}

export const useNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [openSubmenuIndex, setOpenSubmenuIndex] = useState<number | null>(null);
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Check if current page uses SecondaryHeading (pages that should have dark navbar)
  const shouldUseDarkBackground =
    pathname.includes("/about-court/news") ||
    pathname.includes("/litigants-portal") ||
    pathname.includes("/constitutional-court") ||
    pathname.includes("/legal-principles") ||
    pathname.includes("/supreme-court-library") ||
    pathname.includes("/technical-office") ||
    // About court section paths with SecondaryHeading
    pathname.includes("/about-court/counselors") ||
    pathname.includes("/about-court/courts-law") ||
    // Litigants portal paths with SecondaryHeading
    pathname.includes("/litigants-portal/important-notices") ||
    pathname.includes("/litigants-portal/litigation-services") ||
    pathname.includes("/litigants-portal/court-releases");

  // Handle body overflow when modals are open
  useEffect(() => {
    if (isMenuOpen || isSearchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen, isSearchOpen]);

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      // Make navbar visible if scrolling up or at the top
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);

      // Set background color change when scrolled
      setIsScrolled(currentScrollPos > 10);

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isMenuOpen) {
      setOpenSubmenuIndex(null);
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const toggleSubmenu = (index: number) => {
    setOpenSubmenuIndex(openSubmenuIndex === index ? null : index);
  };

  const closeAll = () => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
    setOpenSubmenuIndex(null);
  };

  return {
    isMenuOpen,
    isSearchOpen,
    openSubmenuIndex,
    visible,
    isScrolled,
    shouldUseDarkBackground,
    toggleMenu,
    toggleSearch,
    toggleSubmenu,
    closeAll,
  };
};
