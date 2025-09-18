export const getNewsArticles = async (
  page: number = 1,
  perPage: number = 15,
  search?: string
) => {
  const params = new URLSearchParams({
    page: page.toString(),
    per_page: perPage.toString(),
  });

  if (search) {
    params.append("search", search);
  }

  const url = `${process.env.API}articles?${params.toString()}`;

  const response = await fetch(url, {
    next: { revalidate: 600 },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const payload: NewsResponse = await response.json();
  return payload;
};
