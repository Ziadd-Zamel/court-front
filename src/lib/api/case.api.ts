export const getCaseData = async (
  rippId?: string,
  year?: string,
  classId?: string
) => {
  const params = new URLSearchParams();

  if (rippId) params.append("rippId", rippId);
  if (year) params.append("year", year);
  if (classId) params.append("classId", classId);

  // Use full URL for server-side calls
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/case?${params.toString()}`, {
    cache: "no-store",
  });
  console.log(response);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const payload: APIResponse<CaseDataType[]> = await response.json();
  if (!("data" in payload)) {
    throw new Error("error in fetching");
  }
  return payload;
};
