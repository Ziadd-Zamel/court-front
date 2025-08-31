"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface BurgerMenuProps {
  onToggle: (isOpen: boolean) => void;
  isMenuOpen: boolean;
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ onToggle, isMenuOpen }) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  useEffect(() => {
    if (!isMenuOpen) {
      setIsChecked(false);
    }
  }, [isMenuOpen]);
  const handleCheckboxChange = () => {
    const newState = !isChecked;
    setIsChecked(newState);
    onToggle(newState);
  };

  return (
    <label className="burger relative block h-12 w-6 cursor-pointer sm:w-12">
      <input
        type="checkbox"
        id="burger"
        className="hidden"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />

      <motion.span
        className="duration-250 absolute block h-[1px] w-full rounded-lg bg-white transition-all ease-in-out"
        initial={{ rotate: 0, top: "15px", width: "100%" }}
        animate={{
          rotate: isChecked ? 45 : 0,
          top: isChecked ? "17px" : "20px",
          width: isChecked ? "80%" : "100%",
          height: isChecked ? "2px" : "2px",
        }}
        transition={{ duration: 0.25 }}
      />

      <motion.span
        className="duration-250 absolute top-1/2 block h-[1px] w-full -translate-y-1/2 rounded-lg bg-white transition-all ease-in-out"
        initial={{ rotate: 0, top: "25px", width: "100%" }}
        animate={{
          rotate: isChecked ? -45 : 0,
          top: isChecked ? "17px" : "30px",
          width: isChecked ? "80%" : "100%",
          height: isChecked ? "2px" : "2px",
        }}
        transition={{ duration: 0.25 }}
      />
    </label>
  );
};

export default BurgerMenu;
