"use client";

import { PaginationComponent } from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQueryStates } from "nuqs";

import { principlePaginationParsers } from "@/hooks/use-principle-search";

type Props = {
  pagination: {
    currentPage: number;
    limit: number;
  };
  totalPages: number;
  /** Principle page: update URL via nuqs without router.push */
  shallowUpdate?: boolean;
};

export default function CourtPagination({
  pagination,
  totalPages,
  shallowUpdate = false,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, setPagination] = useQueryStates(principlePaginationParsers, {
    shallow: true,
    history: "push",
  });

  const handlePageChange = (newPage: number) => {
    if (shallowUpdate) {
      void setPagination({
        page: String(newPage),
        limit: String(pagination.limit),
      });
    } else {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", newPage.toString());
      params.set("limit", pagination.limit.toString());
      router.push(`${pathname}?${params.toString()}`);
    }

    if (!shallowUpdate) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
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
