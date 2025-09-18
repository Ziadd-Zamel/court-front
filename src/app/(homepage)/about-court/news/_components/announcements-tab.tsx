import NoDataState from "@/components/custom/no-data-state";

interface AnnouncementsTabProps {
  pagination: {
    currentPage: number;
    limit: number;
  };
  searchQuery?: string;
}

export default function AnnouncementsTab({
  pagination,
  searchQuery,
}: AnnouncementsTabProps) {
  // Show empty state until backend filter is implemented
  return <NoDataState />;
}
