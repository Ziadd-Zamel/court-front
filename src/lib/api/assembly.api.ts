export const getAssemblyByCategory = async (
  page: number = 1,
  perPage: number = 10,
  uuid: string,
  search?: string
) => {
  const params = new URLSearchParams({
    subcategory_uuid: uuid,
    page: page.toString(),
    per_page: perPage.toString(),
  });
  if (search) {
    params.append("search", search);
  }
  const url = `${process.env.API}general-assemblies?${params.toString()}`;

  const response = await fetch(url, {
    next: { revalidate: 600 },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const payload: APIResponse<Assembly[]> = await response.json();
  return payload;
};
