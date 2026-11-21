import catchError from "@/lib/utils/catch-error";
import { getConstitutionalSessions } from "@/lib/api/constitutional.api";
import ErrorState from "@/components/custom/error-state";
import NoDataState from "@/components/custom/no-data-state";
import { Accordion } from "@/components/ui/accordion";
import CourtPagination from "@/components/custom/court-pagination";
import AssemblySessionCard from "@/components/common/assembly-session-card";
import SectionHeading from "@/components/common/section-heading";

type Props = {
  pagination: {
    currentPage: number;
    limit: number;
  };
  search?: string;
  heading?: string;
};

export default async function ConstitutionalCourtSessions({
  pagination,
  search,
  heading,
}: Props) {
  const [data, error] = await catchError(() =>
    getConstitutionalSessions(pagination.currentPage, pagination.limit, search),
  );

  const total = data?.meta?.total ?? 0;
  const headingNode = heading ? (
    <SectionHeading title={heading} count={total} />
  ) : null;

  if (error) {
    return (
      <>
        {headingNode}
        <ErrorState />
      </>
    );
  }

  if (!data || !data.data.length) {
    return (
      <>
        {headingNode}
        <NoDataState />
      </>
    );
  }

  return (
    <section>
      {headingNode}
      <Accordion style={{ direction: "rtl" }} type="single" collapsible>
        {data.data.map((session, index) => (
          <AssemblySessionCard
            key={session.uuid}
            assembly={session}
            index={index}
          />
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
