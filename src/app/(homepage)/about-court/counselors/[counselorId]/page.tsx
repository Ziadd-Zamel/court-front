import CounselorPage from "./_components/counselor-page";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ counselorId: string }>;
  searchParams: Promise<{ page?: string; limit?: string }>;
}) {
  const awaitedParams = await params;
  const resolvedSearchParams = await searchParams;
  const counselorId = awaitedParams.counselorId;
  const currentPage = Math.max(1, Number(resolvedSearchParams.page) || 1);
  const limit = Math.max(
    1,
    Math.min(50, Number(resolvedSearchParams.limit) || 10),
  );

  return (
    <CounselorPage
      counselorId={counselorId}
      pagination={{ currentPage, limit }}
    />
  );
}
