import ArticleCard from "@/components/common/article-card";
import CounselorCard from "@/components/common/counselor-card";
import SecondaryHeading from "@/components/common/seondary-heading";
import CourtPagination from "@/components/custom/court-pagination";
import ErrorState from "@/components/custom/error-state";
import NoDataState from "@/components/custom/no-data-state";
import { getCounselorByID } from "@/lib/api/counselors.api";
import catchError from "@/lib/utils/catch-error";
import { Accordion } from "@radix-ui/react-accordion";

export default async function CounselorPage({
  counselorId,
  pagination,
}: {
  counselorId: string;
  pagination: { currentPage: number; limit: number };
}) {
  const [CounselorsData, error] = await catchError(() =>
    getCounselorByID(counselorId, pagination.currentPage, pagination.limit),
  );

  if (error) return <ErrorState />;

  if (!CounselorsData || !CounselorsData.data) {
    return <NoDataState />;
  }

  const counselor = CounselorsData.data;
  const rulings = counselor.rulings?.data ?? [];
  const rulingsTotal =
    counselor.rulings?.meta?.total ?? counselor.rulings_count ?? 0;
  const totalPages = counselor.rulings?.meta?.last_page ?? 1;

  return (
    <section>
      <SecondaryHeading title="أعمال مستشار" />

      <div className="box-container flex flex-col items-start gap-8 pb-24 pt-16 md:flex-row md:gap-20 md:pb-40 md:pt-32">
        <div className="w-full shrink-0 md:max-w-[350px]">
          <CounselorCard counselor={counselor} />
        </div>

        <div className="flex min-w-0 flex-1 flex-col md:-mt-10">
          <h2 className="w-full max-w-full border-b-3 border-b-main pb-3 text-base font-medium leading-relaxed sm:text-xl md:w-fit">
            المستشار: {counselor.name} ( الأعمال: {rulingsTotal})
          </h2>

          <div className="mt-6 flex w-full min-w-0 flex-col items-center justify-center md:mt-10">
            {rulings.length === 0 ? (
              <NoDataState />
            ) : (
              <>
                <Accordion type="single" className="w-full">
                  {rulings.map((ruling, index) => (
                    <ArticleCard
                      index={index}
                      key={ruling.uuid}
                      article={ruling}
                      from={`/about-court/counselors/${counselorId}`}
                    />
                  ))}
                </Accordion>

                {totalPages > 1 && (
                  <CourtPagination
                    pagination={pagination}
                    totalPages={totalPages}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
