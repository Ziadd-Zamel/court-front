"use client";

import NoDataState from "@/components/custom/no-data-state";

const SearchResults = () => {
  // TODO: Restore search results when ready - always show no data for now
  return (
    <NoDataState
      title="لم تُرفع بيانات هذه الصفحة بعد"
      message="في انتظار إمدادنا بها من النقابة العامة للمحامين"
      showRefreshButton={false}
    />
  );
};

export default SearchResults;
