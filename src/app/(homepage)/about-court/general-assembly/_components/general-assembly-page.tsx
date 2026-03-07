import ReusableTabs, { TabItem } from "@/components/common/reusable-tabs";
import { getAssemblySub } from "@/lib/api/subcategories";
import AssemblyContent from "./assembly-page";

type Props = {
  pagination: {
    currentPage: number;
    limit: number;
  };
  search?: string;
};

export default async function GeneralAssemblyPage({
  pagination,
  search,
}: Props) {
  const data = await getAssemblySub();
  const categoriesData = data?.data || [];

  // Static tab
  const staticTab: TabItem = {
    label: "عن الجمعية",
    value: "about-assembly",
    heading: "عن الجمعية",
    component: (
      <p className="text-justify text-gray-600 md:text-sm indent-7 leading-6">
        نص عن الجمعية يمكن تعديله لاحقاً
      </p>
    ),
  };

  // Dynamic tabs from categories
  const dynamicTabs: TabItem[] = categoriesData.map((category) => ({
    label: category.name,
    value: category.uuid,
    heading: category.name,
    component: (
      <AssemblyContent
        search={search}
        uuid={category.uuid}
        pagination={pagination}
      />
    ),
  }));

  const tabs = [...dynamicTabs, staticTab];

  return (
    <section
      id="ImportantNotices"
      aria-labelledby="Important Notices Page"
      className="relative pt-20 pb-40 w-full box-container"
    >
      <ReusableTabs tabs={tabs} defaultValue={staticTab.value} />
    </section>
  );
}
