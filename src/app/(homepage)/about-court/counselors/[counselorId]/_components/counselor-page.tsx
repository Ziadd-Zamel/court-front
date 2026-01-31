import ArticleCard from "@/components/common/article-card";
import CounselorCard from "@/components/common/counselor-card";
import SecondaryHeading from "@/components/common/seondary-heading";
import ErrorState from "@/components/custom/error-state";
import NoDataState from "@/components/custom/no-data-state";
import { getCounselorByID } from "@/lib/api/counselors.api";
import catchError from "@/lib/utils/catch-error";

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

  return (
    <section>
      <SecondaryHeading title="أعمال مستشار" />
      <div className="flex items-start gap-20 box-container pt-32">
        <div className="flex-shrink-0">
          <CounselorCard counselor={CounselorsData.data} />
        </div>
        <div className="flex flex-col -mt-10 flex-1">
          <h2 className="text-xl font-medium border-b-3 w-fit border-b-main pb-3 ">
            المستشار :{CounselorsData.data.name}
          </h2>
          <div className="w-full flex justify-center items-center">
            {!CounselorsData.data.rulings ||
            CounselorsData.data.rulings.length === 0 ? (
              <NoDataState />
            ) : (
              CounselorsData.data.rulings.map((ruling, index) => {
                return (
                  <ArticleCard
                    index={index}
                    key={ruling.uuid}
                    article={ruling}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
