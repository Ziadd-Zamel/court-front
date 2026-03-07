export const getConstitutionalSessions = async (
  page: number = 1,
  perPage: number = 10,
  search?: string,
) => {
  const params = new URLSearchParams({
    page: page.toString(),
    per_page: perPage.toString(),
  });
  if (search) params.set("search", search);

  const response = await fetch(
    `${process.env.API}constitutional-works?${params.toString()}`,
    {
      next: { revalidate: 600 },
    },
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const payload: APIResponse<Assembly[]> = await response.json();
  return payload;
};

export const getConstitutionalCategories = async () => {
  const response = await fetch(`${process.env.API}constitutional-categories`, {
    next: { revalidate: 600 },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const payload: APIResponse<{ uuid: string; title: string }[]> =
    await response.json();
  return payload;
};

export const getConstitutionalItemsByCategory = async (
  category_uuid: string,
  page: number = 1,
  perPage: number = 10,
  search?: string,
) => {
  const params = new URLSearchParams({
    category_id: category_uuid,
    page: page.toString(),
    per_page: perPage.toString(),
  });
  if (search) params.set("search", search);

  const response = await fetch(
    `${process.env.API}constitutional-items?${params.toString()}`,
    {
      next: { revalidate: 600 },
    },
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const payload: APIResponse<
    { uuid: string; title: string; answer: string }[]
  > = await response.json();
  return payload;
};
