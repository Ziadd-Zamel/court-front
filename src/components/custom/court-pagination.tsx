"use client";

import { PaginationComponent } from "@/components/ui/pagination";
import { principlePaginationParsers } from "@/hooks/use-principle-search";
import { tabLimitParamKey, tabPageParamKey } from "@/lib/utils/tab-pagination";
import { useQueryStates } from "nuqs";
import { useTransition } from "react";

type Props = {
  pagination: {
    currentPage: number;
    limit: number;
  };
  totalPages: number;
  /** Secondary tab id — uses page_<pageKey> in URL. Omit to keep global page/limit. */
  pageKey?: string;
  /** Principle page: update URL via nuqs without router.push */
  shallowUpdate?: boolean;
};

function scrollToMainTabContent() {
  const mainTabContent = document.getElementById("main-tab-content");
  if (mainTabContent) {
    mainTabContent.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

export default function CourtPagination({
  pagination,
  totalPages,
  pageKey,
  shallowUpdate = false,
}: Props) {
  const [, startTransition] = useTransition();
  const [, setPagination] = useQueryStates(principlePaginationParsers, {
    shallow: shallowUpdate,
    history: "push",
    scroll: false,
    startTransition,
    ...(pageKey
      ? {
          urlKeys: {
            page: tabPageParamKey(pageKey),
            limit: tabLimitParamKey(pageKey),
          },
        }
      : {}),
  });

  const handlePageChange = (newPage: number) => {
    void setPagination({
      page: String(newPage),
      limit: String(pagination.limit),
    });
    if (!shallowUpdate) {
      scrollToMainTabContent();
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
