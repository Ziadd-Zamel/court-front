import { buildQueryParams } from "../utils/build-query-params";

export const getPublicationCategories = async () => {
  const response = await fetch(
    `${process.env.API}publication-categories?per_page=10`,
    {
      next: { revalidate: 600 },
    },
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const payload: APIResponse<{ uuid: string; name: string }[]> =
    await response.json();
  return payload;
};

export const getPublicationByCategory = async (
  page: number = 1,
  perPage: number = 10,
  category_uuid: string,
) => {
  const queryString = buildQueryParams({
    category_uuid: category_uuid,
    page,
    per_page: perPage,
  });

  const url = `${process.env.API}publications/by-category?${queryString}`;

  const response = await fetch(url, {
    next: { revalidate: 600 },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  console.log(response);
  const payload: APIResponse<BookData[]> = await response.json();

  return payload;
};
