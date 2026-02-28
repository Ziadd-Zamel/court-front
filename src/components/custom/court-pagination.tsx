"use client";
import { PaginationComponent } from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
  pagination: {
    currentPage: number;
    limit: number;
  };
  totalPages: number;
};

export default function CourtPagination({ pagination, totalPages }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    params.set("limit", pagination.limit.toString());

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
      maxVisiblePages={3}
    />
  );
}
