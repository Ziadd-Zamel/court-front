// CounselorPage.tsx

import ArticleCard from "@/components/common/article-card";
import CounselorCard from "@/components/common/counselor-card";
import SecondaryHeading from "@/components/common/seondary-heading";
import ErrorState from "@/components/custom/error-state";
import NoDataState from "@/components/custom/no-data-state";
import { getCounselorByID } from "@/lib/api/counselors.api";
import catchError from "@/lib/utils/catch-error";
import { Accordion } from "@radix-ui/react-accordion";

export default async function CounselorPage({
  counselorId,
}: {
  counselorId: string;
}) {
  const [CounselorsData, error] = await catchError(() =>
    getCounselorByID(counselorId),
  );

  if (error) return <ErrorState />;

  if (!CounselorsData || !CounselorsData.data) {
    return <NoDataState />;
  }

  const counselor = CounselorsData.data;
  console.log(counselor);
  return (
    <section>
      <SecondaryHeading title="أعمال مستشار" />

      <div className="flex items-start gap-20 box-container pt-32 pb-40">
        <div className="flex-shrink-0 max-w-[350px]">
          <CounselorCard counselor={counselor} />
        </div>

        <div className="flex flex-col -mt-10 flex-1">
          <h2 className="text-xl font-medium border-b-3 w-fit border-b-main pb-3">
            المستشار: {counselor.name} ( الأعمال:{" "}
            {counselor.rulings?.length || 0})
          </h2>

          <div className="w-full flex justify-center items-center mt-10">
            {!counselor.rulings || counselor.rulings.length === 0 ? (
              <NoDataState />
            ) : (
              <Accordion type="single">
                {counselor.rulings.map((ruling, index) => (
                  <ArticleCard
                    index={index}
                    key={ruling.uuid}
                    article={ruling}
                    from={`/about-court/counselors/${counselorId}`}
                  />
                ))}
              </Accordion>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
