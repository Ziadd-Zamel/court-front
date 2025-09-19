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
