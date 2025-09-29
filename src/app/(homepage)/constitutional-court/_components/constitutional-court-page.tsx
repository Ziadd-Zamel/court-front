import ReusableTabs, { TabItem } from "@/components/common/reusable-tabs";
import ArticleListSkeleton from "@/components/custom/article-list-skeleton";
import ArticlePage from "@/components/custom/article-page";
import { getConstitutionSub } from "@/lib/api/subcategories";
import { Suspense } from "react";

type Props = {
  pagination: {
    currentPage: number;
    limit: number;
  };
  search?: string;
};

export default async function ConstitutionalCourtPage({
  pagination,
  search,
}: Props) {
  const data = await getConstitutionSub();
  const categoriesData = data?.data || [];

  // Static tabs configuration
  const staticTabs: TabItem[] = [
    {
      label: "عن الدائرة الدستورية",
      value: "constitutional-court",
      heading: "عن الدائرة الدستورية",
      component: (
        <p className="text-justify text-gray-500 md:text-xl">
          حيث إن ما استند إليه المدعي في البرهنة على ملكية البائعة ما باعته إياه
          من الأرض انحصر في عقد القسمة العرفي، فإن هذا لا يسعفُه ليؤتَى سؤلَه
          بالصحة والنفاذ. فجدوى هذا العقد ههنا تتوقف على صلاحيته القانونية لنقل
          الملكية إليها. وحيث إنه بذاته لا يصلح لذلك، بل يستوجب إما تسجيلَه في
          السجل العقاري، وإما حكماً قضائياً بصحته ونفاذه وتسجيلَ هذا الحكم بذلك
          السجل. لهذا، كان على المدعي التدليلُ على تحقق واحدٍ من هذين الشرطين.
          فإن لم يكن، امتنع حسبان المدعى عليها مالكةً ما باعت، وانعدمت، من ثم،
          قدرتها على نقل الملكية، ولم يبق أمام المدعي إلا أن يختصم أطرافَ عقد
          القسمة جميعَهم ليطلبَ الحكمَ بصحته، توطئةً للحكم بصحة عقده ونفاذه.
          فإذا ما أُجيب طلبُه وسجل الحكمَ الصادر بصحة العقدين انتقلت الملكية
          إليه. فهذا وحدَه ما يوافق الأحكامَ المقررةَ في انتقال الملكية وأسباب
          نقلها، ويضمنُ تسلسلَ أسباب اكتسابها من المالك إلى المدعي.
        </p>
      ),
    },
  ];

  // Dynamic tabs from categories (empty array if no data)
  const dynamicTabs: TabItem[] = categoriesData.map((category) => ({
    label: category.name,
    value: category.uuid,
    heading: category.name,
    component: (
      <Suspense fallback={<ArticleListSkeleton />}>
        <ArticlePage
          search={search}
          uuid={category.uuid}
          pagination={pagination}
        />
      </Suspense>
    ),
  }));

  // Combine static and dynamic tabs
  const allTabs: TabItem[] = [...dynamicTabs, ...staticTabs];

  return (
    <section
      id="ImportantNotices"
      aria-labelledby="Important Notices Page"
      className="relative pt-10 w-full box-container mb-80"
    >
      <ReusableTabs
        tabs={allTabs}
        defaultValue={categoriesData[0].uuid}
        className="lg:-mt-12"
        tabContentClassName=" mt-32 lg:mt-[150px]"
      />
    </section>
  );
}
