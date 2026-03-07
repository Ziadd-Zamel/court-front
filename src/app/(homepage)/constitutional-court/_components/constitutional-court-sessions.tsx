import catchError from "@/lib/utils/catch-error";
import { getConstitutionalSessions } from "@/lib/api/constitutional.api";
import ErrorState from "@/components/custom/error-state";
import NoDataState from "@/components/custom/no-data-state";
import { Accordion } from "@/components/ui/accordion";
import CourtPagination from "@/components/custom/court-pagination";
import AssemblySessionCard from "@/components/common/assembly-session-card";

type Props = {
  pagination: {
    currentPage: number;
    limit: number;
  };
  search?: string;
};

export default async function ConstitutionalCourtSessions({ pagination, search }: Props) {
  const [data, error] = await catchError(() =>
    getConstitutionalSessions(pagination.currentPage, pagination.limit, search),
  );

  if (error) return <ErrorState />;

  if (!data || !data.data.length) return <NoDataState />;
  console.log(data);
  return (
    <section>
      <Accordion style={{ direction: "rtl" }} type="single" collapsible>
        {data.data.map((session, index) => (
          <AssemblySessionCard key={session.uuid} assembly={session} index={index} />
        ))}
      </Accordion>

      {data.meta.last_page > 1 && (
        <CourtPagination
          pagination={pagination}
          totalPages={data.meta.last_page}
        />
      )}
    </section>
  );
}
