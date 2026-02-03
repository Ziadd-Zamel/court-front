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

  if (!CounselorsData || !CounselorsData?.data) return <NoDataState />;

  console.log(CounselorsData);
  return (
    <section>
      <SecondaryHeading title="أعمال مستشار" />
      <div className="flex items-start gap-20 box-container pt-32 pb-40">
        <div className="flex-shrink-0">
          <CounselorCard counselor={CounselorsData.data} />
        </div>
        <div className="flex flex-col -mt-10 flex-1">
          <h2 className="text-xl font-medium border-b-3 w-fit border-b-main pb-3 ">
            المستشار: {CounselorsData.data.name}
          </h2>
          <div className="w-full flex justify-center items-center mt-10">
            {!CounselorsData.data.rulings ||
            CounselorsData.data.rulings.length === 0 ? (
              <NoDataState />
            ) : (
              <Accordion type="single">
                {CounselorsData.data.rulings.map((ruling, index) => {
                  return (
                    <ArticleCard
                      index={index}
                      key={ruling.uuid}
                      article={ruling}
                    />
                  );
                })}
              </Accordion>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
