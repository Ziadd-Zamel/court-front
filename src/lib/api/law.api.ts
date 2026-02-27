export const getAllLaws = async () => {
  const url = `${process.env.API}laws?per_page=6`;
  const response = await fetch(url, {
    next: { revalidate: 600 },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const payload: APIResponse<Law[]> = await response.json();
  return payload;
};

export const getLawByType = async (type: LawTypeSlug) => {
  const url = `${process.env.API}laws/${type}`;
  const response = await fetch(url, {
    next: { revalidate: 600 },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const payload: APIResponse<Law> = await response.json();
  return payload;
};

export const getOtherLaws = async () => {
  const url = `${process.env.API}laws/other`;
  const response = await fetch(url, {
    next: { revalidate: 600 },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const payload: APIResponse<Law[]> = await response.json();
  return payload;
};

export type OtherLawCategory = {
  uuid: string;
  name: string;
};

export const getOtherLawCategories = async () => {
  const url = `${process.env.API}laws/other/categories`;
  const response = await fetch(url, {
    next: { revalidate: 600 },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const payload: APIResponse<OtherLawCategory[]> = await response.json();
  return payload;
};

export const getOtherLawsByCategory = async (categoryUuid: string) => {
  const url = `${process.env.API}laws/other/by-category?category_uuid=${categoryUuid}`;
  const response = await fetch(url, {
    next: { revalidate: 600 },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const payload: APIResponse<Law[]> = await response.json();
  return payload;
};
