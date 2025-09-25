export const getClassificationsData = async () => {
  // Use full URL for server-side calls
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/classifications`, {
    cache: "no-store",
  });

  console.log(response);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const payload: APIResponse<ClassificationDataType[]> = await response.json();
  if (!("data" in payload)) {
    throw new Error("error in fetching");
  }
  return payload;
};
