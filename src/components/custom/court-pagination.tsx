"use client";
import { PaginationComponent } from "@/components/ui/pagination";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  pagination: {
    currentPage: number;
    limit: number;
  };
  totalPages: number;
};

export default function CourtPagination({ pagination, totalPages }: Props) {
  // Router
  const router = useRouter();
  const pathname = usePathname();

  // Handle page change
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams();
    params.set("page", newPage.toString());
    params.set("limit", pagination.limit.toString());

    // Update URL with new parameters
    router.push(`${pathname}?${params.toString()}`);

    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <PaginationComponent
      currentPage={pagination.currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  );
}
