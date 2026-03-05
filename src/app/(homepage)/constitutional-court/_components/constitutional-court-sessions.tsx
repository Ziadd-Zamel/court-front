import catchError from "@/lib/utils/catch-error";
import { getConstitutionalSessions } from "@/lib/api/constitutional.api";
import ErrorState from "@/components/custom/error-state";
import NoDataState from "@/components/custom/no-data-state";
import { Accordion } from "@/components/ui/accordion";
import CourtPagination from "@/components/custom/court-pagination";
import ConstitutionalSessionCard from "./constitutional-session-card";

type Props = {
  pagination: {
    currentPage: number;
    limit: number;
  };
};

export default async function ConstitutionalCourtSessions({
  pagination,
}: Props) {
  const [data, error] = await catchError(() =>
    getConstitutionalSessions(pagination.currentPage, pagination.limit),
  );

  if (error) return <ErrorState />;

  if (!data || !data.data.length) return <NoDataState />;

  return (
    <section>
      <Accordion style={{ direction: "rtl" }} type="single" collapsible>
        {data.data.map((session) => (
          <ConstitutionalSessionCard key={session.uuid} session={session} />
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
