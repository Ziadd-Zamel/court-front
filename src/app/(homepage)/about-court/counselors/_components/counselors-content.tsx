import CounselorCard from "@/components/common/counselor-card";
import CourtPagination from "@/components/custom/court-pagination";
import ErrorState from "@/components/custom/error-state";
import NoDataState from "@/components/custom/no-data-state";
import NoSearchResults from "@/components/custom/no-result";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getAllCounselors } from "@/lib/api/counselors.api";
import catchError from "@/lib/utils/catch-error";
import Link from "next/link";

type ArticlePageProps = {
  pagination: { currentPage: number; limit: number };
  search?: string;
};

export default async function CounselorsContent({
  search,
  pagination,
}: ArticlePageProps) {
  const [CounselorsData, error] = await catchError(() =>
    getAllCounselors(pagination.currentPage, 26, search),
  );

  if (error) return <ErrorState />;
  if (!CounselorsData || CounselorsData?.data.length === 0) {
    if (search && search.trim() !== "") return <NoSearchResults />;
    return <NoDataState />;
  }

  return (
    <>
      {/* Featured president card */}
      <div className="box-container mt-16 mb-4" dir="rtl">
        <div className="relative overflow-hidden bg-white border border-gray-100 shadow-md">
          {/* Subtle dot pattern */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative flex flex-col sm:flex-row items-center gap-8 p-8 sm:p-10">
            {/* Avatar */}
            <div className="shrink-0 flex flex-col items-center gap-3">
              <Avatar className="size-24 sm:size-28 border-4 border-main/20 shadow-md">
                <AvatarFallback className="bg-main/5 text-main text-3xl font-bold">
                  ع
                </AvatarFallback>
              </Avatar>
              <span className="text-xs font-medium text-main bg-main/8 border border-main/20 px-3 py-1 rounded-full whitespace-nowrap">
                رئيس المحكمة العليا
              </span>
            </div>

            {/* Vertical divider */}
            <div className="hidden sm:block w-px self-stretch bg-gradient-to-b from-transparent via-gray-200 to-transparent mx-2" />

            {/* Info */}
            <div className="flex flex-col gap-5 flex-1 text-center sm:text-right">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                عبدالله محمد أبوزريزة
              </h3>

              <ol className="flex flex-col gap-2">
                {[
                  "1971",
                  "دكتوراه في القانون الدولي والشريعة",
                  "24 عاماً في العمل القضائي",
                  "2022 مستشاراً في المحكمة العليا",
                ].map((item) => (
                  <li
                    key={item}
                    className="text-gray-600 text-sm flex items-center gap-2 justify-center sm:justify-start"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-main shrink-0" />
                    {item}
                  </li>
                ))}
              </ol>

              <div className="h-px bg-gradient-to-l from-transparent via-gray-200 to-transparent" />

              {/* Roles */}
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                {[
                  "رئيس المحكمة العليا",
                  "رئيس الدائرة الدستورية",
                  "رئيس الدوائر مجتمعة",
                  "رئيس دائرة النقض الجنائي",
                ].map((role) => (
                  <span
                    key={role}
                    className="text-xs font-medium bg-main/5 border border-main/20 text-main px-3 py-1.5 rounded-full"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 py-16 box-container">
        {CounselorsData.data.map((counselor) => (
          <Link
            href={`/about-court/counselors/${counselor.uuid}`}
            key={counselor.uuid}
          >
            <CounselorCard counselor={counselor} />
          </Link>
        ))}
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
