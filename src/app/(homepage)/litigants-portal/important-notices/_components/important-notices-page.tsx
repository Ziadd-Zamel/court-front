import catchError from "@/lib/utils/catch-error";
import { getQuestionCategories } from "@/lib/api/question.api";
import ErrorState from "@/components/custom/error-state";
import NoDataState from "@/components/custom/no-data-state";
import ReusableTabs, { TabItem } from "@/components/common/reusable-tabs";
import QuestionsContent from "./questions-content";

type Props = {
  pagination: {
    currentPage: number;
    limit: number;
  };
  search?: string;
};

export default async function ImportantNoticesPage({
  pagination,
  search,
}: Props) {
  const [categoriesData, categoriesError] = await catchError(() =>
    getQuestionCategories(),
  );

  if (categoriesError) return <ErrorState />;

  if (!categoriesData?.data || !categoriesData.data.length)
    return <NoDataState />;

  const tabs: TabItem[] = categoriesData.data.map((category) => ({
    label: category.title,
    value: category.uuid,
    heading: category.title,
    component: (
      <QuestionsContent
        categoryId={category.uuid}
        pagination={pagination}
        search={search}
      />
    ),
  }));

  return (
    <section
      id="ImportantNotices"
      aria-labelledby="Important Notices Page"
      className="relative pt-10 w-full box-container flex flex-col mb-20"
    >
      <p className="pb-10 text-base text-gray-500 text-center">
        <span className="text-lg"> تنبيه:</span> هذه المعلومات معدة لتيسير
        الإجراءات للمتقاضين والقانونيين، <br /> ولا تمثل بالضرورة حكم القانون في
        مسائلها.
      </p>

      <ReusableTabs
        tabs={tabs}
        defaultValue={categoriesData.data[0].uuid}
        showHeading
      />
    </section>
  );
}
