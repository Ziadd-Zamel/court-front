export const getArticlesByCategory = async (
  page: number = 1,
  perPage: number = 10,
  uuid: string,
  search?: string,
) => {
  const params = new URLSearchParams({
    subcategory_uuid: uuid,
    page: page.toString(),
    per_page: perPage.toString(),
  });
  if (search) {
    params.append("search", search);
  }
  const url = `${process.env.API}rulings/by-subcategory?${params.toString()}`;

  const response = await fetch(url, {
    next: { revalidate: 600 },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const payload: APIResponse<Article[]> = await response.json();
  return payload;
};
export const getArticleByID = async (uuid: string) => {
  const url = `${process.env.API}rulings/${uuid}`;

  const response = await fetch(url, {
    next: { revalidate: 600 },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const payload: APIResponse<Article> = await response.json();
  return payload;
};

export const getConstitutionalRulingsFavourites = async () => {
  const url = `${process.env.API}rulings/favourites?per_page=9`;

  const response = await fetch(url, {
    next: { revalidate: 600 },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const payload: APIResponse<Article[]> = await response.json();
  return payload;
};
export const getRecentRulings = async () => {
  const url = `${process.env.API}rulings/latest?per_page=9`;

  const response = await fetch(url, {
    next: { revalidate: 600 },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const payload: APIResponse<Article[]> = await response.json();
  return payload;
};
