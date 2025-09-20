"use client";

import { useNavbar } from "./hooks/useNavbar";
import { NavbarProps } from "./types/navbar.types";
import NavbarContainer from "./_components/NavbarContainer";
import ActionButtons from "./_components/ActionButtons";
import SearchOverlay from "./_components/SearchOverlay";
import MenuOverlay from "./_components/MenuOverlay";
import Image from "next/image";

export default function Header({ opacity = false }: NavbarProps) {
  const {
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
  } = useNavbar();

  const state = {
    isMenuOpen,
    isSearchOpen,
    openSubmenuIndex,
    visible,
    isScrolled,
    shouldUseDarkBackground,
  };

  const actions = {
    toggleMenu,
    toggleSearch,
    toggleSubmenu,
    closeAll,
  };

  return (
    <>
      <NavbarContainer opacity={opacity} state={state} actions={actions}>
        <ActionButtons
          onToggleSearch={toggleSearch}
          onToggleMenu={toggleMenu}
          isSearchOpen={isSearchOpen}
        />
        <Image
          src="/assets/nav-logo.svg"
          alt="شعار المحكمة"
          width={120}
          height={0}
          className=" w-[100px] sm:w-[200px] -ml-2"
        />
      </NavbarContainer>

      {/* Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={closeAll} />

      {/* Menu Overlay */}
      <MenuOverlay
        isOpen={isMenuOpen}
        onClose={closeAll}
        openSubmenuIndex={openSubmenuIndex}
        onToggleSubmenu={toggleSubmenu}
      />
    </>
  );
}
