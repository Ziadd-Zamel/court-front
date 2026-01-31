import CounselorPage from "./_components/counselor-page";

export default async function Page({
  params,
}: {
  params: Promise<{ counselorId: string }>;
}) {
  const awaitedParams = await params;
  const counselorId = awaitedParams.counselorId;

  return <CounselorPage counselorId={counselorId} />;
}
