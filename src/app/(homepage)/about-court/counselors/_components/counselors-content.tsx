import ArticlesList from "@/components/custom/articlesL-list";
import CourtPagination from "@/components/custom/court-pagination";
import ErrorState from "@/components/custom/error-state";
import NoDataState from "@/components/custom/no-data-state";
import NoSearchResults from "@/components/custom/no-result";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getArticlesByCategory } from "@/lib/api/articles";
import { getAllCounselors } from "@/lib/api/counselors.api";
import catchError from "@/lib/utils/catch-error";
import { Separator } from "@radix-ui/react-select";
import { User } from "lucide-react";

type ArticlePageProps = {
  pagination: {
    currentPage: number;
    limit: number;
  };
  search?: string;
};

export default async function CounselorsContent({
  search,
  pagination,
}: ArticlePageProps) {
  const [CounselorsData, error] = await catchError(() =>
    getAllCounselors(pagination.currentPage, 26, search)
  );

  if (error) return <ErrorState />;

  if (!CounselorsData || CounselorsData?.data.length === 0) {
    // If there's a search query but no results, show NoSearchResults
    if (search && search.trim() !== "") {
      return <NoSearchResults />;
    }
    // Otherwise, show NoDataState for general no data scenario
    return <NoDataState />;
  }
  return (
    <>
      <div className="flex items-center justify-center w-full mt-16">
        <div className="border p-5 pt-10 flex flex-col gap-2 items-center shadow-sm w-full  max-w-[300px]">
          <Avatar className="size-16">
            <AvatarFallback className="">
              <User />
            </AvatarFallback>
          </Avatar>
          <h3 className="text-lg font-bold">عبدالله محمد أبوزريزة</h3>

          <div className="flex flex-col items-start">
            <p className="text-sm text-gray-800">1971</p>
            <p className="text-sm text-gray-800">
              دكتوراه في القانون الدولي والشريعة
            </p>
            <p className="text-sm text-gray-800">24 عاماً في العمل القضائي</p>
            <p className="text-sm text-gray-800">
              2022 مستشاراً في المحكمة العليا
            </p>
          </div>
          <Separator className="w-full h-px bg-gray-200 mt-3 mb-5" />
          <ul className="flex flex-col text-sm text-main text-center">
            <li>رئيس المحكمة العليا</li>
            <li>رئيس الدائرة الدستورية</li>
            <li>رئيس الدوائر مجتمعة</li>
            <li>رئيس دائرة النقض الجنائي</li>
          </ul>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 py-20 box-container">
        {CounselorsData.data.map((counselor) => {
          console.log(counselor);
          return (
            <div
              className="border p-5 pt-10 flex flex-col gap-2 items-center shadow-sm"
              key={counselor.uuid}
            >
              <Avatar className="size-16">
                <AvatarFallback className="">
                  <User />
                </AvatarFallback>
              </Avatar>
              <h3 className="text-lg font-bold">{counselor.name}</h3>

              <div className="flex flex-col items-start">
                <p className="text-sm text-gray-800">{counselor.birth_date}</p>
                <p className="text-sm text-gray-800">
                  {counselor.qualification}
                </p>
                <p className="text-sm text-gray-800">
                  {counselor.experience_years} عاماً في العمل القضائي
                </p>
                <p className="text-sm text-gray-800">
                  {counselor.appointed_year} مستشاراً في المحكمة العليا في
                </p>
              </div>
              <Separator className="w-full h-px bg-gray-200 mt-3 mb-5" />
              <ul className="flex flex-col text-sm text-main text-center">
                <li>رئيس دائرة النقض المدني</li>
                <li>عضو دائرة النقض المدني</li>
                <li>عضو الدوائر مجتمعة</li>
              </ul>
            </div>
          );
        })}
      </div>
      {CounselorsData.meta.last_page > 1 && (
        <CourtPagination
          pagination={pagination}
          totalPages={CounselorsData.meta.last_page}
        />
      )}
    </>
  );
}
