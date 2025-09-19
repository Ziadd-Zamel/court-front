export const getAllCounselors = async (
  page: number = 1,
  perPage: number = 10,
  search?: string
) => {
  const params = new URLSearchParams({
    page: page.toString(),
    per_page: perPage.toString(),
  });
  if (search) {
    params.append("search", search);
  }
  const url = `${process.env.API}counselors?${params.toString()}`;

  const response = await fetch(url, {
    next: { revalidate: 600 },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const payload: APIResponse<Counselor[]> = await response.json();
  return payload;
};
