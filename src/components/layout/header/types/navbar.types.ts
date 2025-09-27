export interface NavbarProps {
  opacity?: boolean;
}

export interface NavbarState {
  isMenuOpen: boolean;
  isSearchOpen: boolean;
  openSubmenuIndex: number | null;
  visible: boolean;
  isScrolled: boolean;
  shouldUseDarkBackground: boolean;
}

export interface NavbarActions {
  toggleMenu: () => void;
  toggleSearch: () => void;
  toggleSubmenu: (index: number) => void;
  closeAll: () => void;
}

export interface LogoProps {
  className?: string;
}

export interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  openSubmenuIndex: number | null;
  onToggleSubmenu: (index: number) => void;
}

export interface ActionButtonsProps {
  onToggleSearch: () => void;
  onToggleMenu: () => void;
  isSearchOpen: boolean;
  isMenuOpen: boolean;
}
