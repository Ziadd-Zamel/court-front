"use client";
import { ReactNode } from "react";
import CustomBreadcrumb from "./custom-breadcrumb";
import { motion } from "framer-motion";

interface Props {
  title: string;
  breadcrumb?: boolean;
  IconSecyion?: ReactNode;
}
export default function SecondaryHeading({
  title,
  breadcrumb,
  IconSecyion,
}: Props) {
  return (
    <div className="relative h-[220px] w-full bg-main pt-16">
      {/* Main content container */}
      <div className="relative z-20 flex h-full items-center justify-between">
        {/*First Part */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-1/2 lg:w-1/4 ps-13"
        >
          <h2 className=" font-bold text-white text-lg sm:text-2xl lg:text-3xl">
            {title}
          </h2>
        </motion.div>

        {/*Seconde Part */}
        <div className="w-1/2 lg:w-1/2 pr-16">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            {breadcrumb && <CustomBreadcrumb black />}
          </motion.div>
        </div>

        {/*Third Part */}
        <div className="hidden h-full  lg:flex w-1/4 bg-main pr-8">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full "
          >
            {IconSecyion ? (
              IconSecyion
            ) : (
              <div className="flex items-center gap-3 w-full h-full ">
                <div className="size-7 rounded-full bg-white" />
                <div className="size-7 rounded-full bg-white" />
                <div className="size-7 rounded-full bg-white" />
                <div className="size-7 rounded-full bg-white" />
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 top-0 z-10 w-[60%] bg-[#F1E2CE] lg:w-[77%]"
        style={{
          clipPath: "polygon(0 0, 100% 0, 70% 100%, 0 100%)",
          zIndex: 10,
        }}
      ></div>
    </div>
  );
}
