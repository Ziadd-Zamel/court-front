import SecondaryTabs, {
  SecondaryTabItem,
} from "@/components/common/secondary-tabs";
import NewsTab from "./news-tab";
import AnnouncementsTab from "./announcements-tab";
import AllTab from "./all-tab";

interface NewsPageProps {
  pagination: {
    currentPage: number;
    limit: number;
  };
  searchQuery?: string;
}

export default function NewsPage({ pagination, searchQuery }: NewsPageProps) {
  const newsTabs: SecondaryTabItem[] = [
    {
      label: "الأخبار",
      value: "news",
      component: <NewsTab pagination={pagination} searchQuery={searchQuery} />,
    },
    {
      label: "الإعلانات",
      value: "announcements",
      component: (
        <AnnouncementsTab pagination={pagination} searchQuery={searchQuery} />
      ),
    },
    {
      label: "الكل",
      value: "all",
      component: <AllTab pagination={pagination} searchQuery={searchQuery} />,
    },
  ];

  return (
    <SecondaryTabs
      tabs={newsTabs}
      defaultValue="news"
      className="w-full flex justify-center items-center mt-20"
      tabListClassName="mb-20"
    />
  );
}
