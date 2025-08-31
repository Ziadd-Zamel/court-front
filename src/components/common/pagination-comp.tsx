"use client";

import React, { FC } from "react";
import { PaginationComponent } from "../ui/pagination";

// Define the props type based on PaginationComponent's props
type PaginationCompProps = React.ComponentProps<typeof PaginationComponent>;

const PaginationComp: FC<PaginationCompProps> = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}) => {
  return (
    <PaginationComponent
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
    />
  );
};

export default PaginationComp;
