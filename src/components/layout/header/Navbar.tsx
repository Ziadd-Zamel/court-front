"use client";

import { useNavbar } from "./hooks/useNavbar";
import { NavbarProps } from "./types/navbar.types";
import NavbarContainer from "./components/NavbarContainer";
import ActionButtons from "./components/ActionButtons";
import Logo from "./components/Logo";
import SearchOverlay from "./components/SearchOverlay";
import MenuOverlay from "./components/MenuOverlay";

export default function Navbar({ opacity = false }: NavbarProps) {
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
        <Logo />
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
