import CounselorCard from "@/components/common/counselor-card";
import CourtPagination from "@/components/custom/court-pagination";
import ErrorState from "@/components/custom/error-state";
import NoDataState from "@/components/custom/no-data-state";
import NoSearchResults from "@/components/custom/no-result";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
    getAllCounselors(pagination.currentPage, 40, search),
  );

  if (error) return <ErrorState />;
  if (!CounselorsData || CounselorsData?.data.length === 0) {
    if (search && search.trim() !== "") return <NoSearchResults />;
    return <NoDataState />;
  }

  const hasSearch = Boolean(search?.trim());
  const [firstCounselor, ...restCounselors] = CounselorsData.data;
  const featuredCounselor = hasSearch ? null : firstCounselor;
  const gridCounselors = hasSearch ? CounselorsData.data : restCounselors;

  const birthYear = featuredCounselor?.birth_date?.slice(0, 4) || "------";
  const qualificationYear = featuredCounselor?.appointed_year || "------";
  const qualificationText =
    featuredCounselor?.higher_qualification || featuredCounselor?.qualification;
  const experienceText = featuredCounselor?.experience_years
    ? `${featuredCounselor.experience_years} عاماً في العمل القضائي`
    : "------";
  const appointmentText = featuredCounselor?.appointed_year
    ? `${featuredCounselor.appointed_year} مستشاراً في المحكمة العليا`
    : "------";
  const featuredRole = featuredCounselor?.tasks || "------";
  const fields = featuredCounselor?.fields?.map((f) => f.field).filter(Boolean) || [];

  return (
    <>
      {/* Featured president card */}
      {featuredCounselor && (
        <div className="box-container mt-16 mb-4" dir="rtl">
          <div className="relative overflow-hidden bg-white dark:bg-white/10 border border-gray-100 dark:border-white/10 shadow-md">
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
                  {featuredCounselor.image && (
                    <AvatarImage src={featuredCounselor.image} />
                  )}
                  <AvatarFallback className="bg-main/5 text-main text-3xl font-bold">
                    {featuredCounselor.name?.slice(0, 1) || "ع"}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs font-medium text-main bg-main/8 dark:bg-white/10 dark:border-white/20 border border-main/20 px-3 py-1 rounded-full whitespace-nowrap">
                  {featuredRole}
                </span>
              </div>

              {/* Vertical divider */}
              <div className="hidden sm:block w-px self-stretch bg-gradient-to-b from-transparent via-gray-200 dark:via-white/20 to-transparent mx-2" />

              {/* Info */}
              <div className="flex flex-col gap-5 flex-1 text-center sm:text-right">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  {featuredCounselor.name}
                </h3>

                <ol className="flex flex-col gap-2">
                  {[
                    birthYear,
                    `${qualificationYear} ${qualificationText || ""}`.trim(),
                    experienceText,
                    appointmentText,
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

                <div className="h-px bg-gradient-to-l from-transparent via-gray-200 dark:via-white/20 to-transparent" />

                {/* Roles */}
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  {[featuredRole, ...fields].filter(Boolean).map((role) => (
                    <span
                      key={role}
                      className="text-xs font-medium bg-main/5 dark:bg-white/10 dark:border-white/20 border border-main/20 text-main px-3 py-1.5 rounded-full"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 py-16 box-container">
        {gridCounselors.map((counselor) => (
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
