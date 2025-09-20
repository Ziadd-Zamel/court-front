export const getBooksByType = async (
  page: number = 1,
  perPage: number = 10,
  type?: "rulings_set" | "supreme_court" | "other"
) => {
  const params = new URLSearchParams({
    page: page.toString(),
    per_page: perPage.toString(),
  });

  if (type) {
    params.append("type", type);
  }

  const url = `${
    process.env.API
  }books/by-release-for?release_type=${params.toString()}`;
  const response = await fetch(url, {
    next: { revalidate: 600 },
  });
  console.log(getBooksByType);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const payload: APIResponse<BookData[]> = await response.json();
  return payload;
};
export const getBooksSeach = async (
  title?: string,
  author?: string,
  index_content?: string
) => {
  const params = new URLSearchParams();

  if (title) {
    params.append("title", title);
  }
  if (author) {
    params.append("author", author);
  }
  if (index_content) {
    params.append("index_content", index_content);
  }

  const url = `${process.env.API}books/search?${params.toString()}`;
  const response = await fetch(url, {
    next: { revalidate: 600 },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const payload: APIResponse<BookData[]> = await response.json();
  return payload;
};

export const getPendingBooks = async (
  page: number = 1,
  perPage: number = 10
) => {
  const params = new URLSearchParams({
    page: page.toString(),
    per_page: perPage.toString(),
  });

  const url = `${process.env.API}pending-publications?${params.toString()}`;
  const response = await fetch(url, {
    next: { revalidate: 600 },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const payload: APIResponse<PendingBook[]> = await response.json();
  return payload;
};

export const getBookByID = async (uuid: string) => {
  const url = `${process.env.API}books/${uuid}`;

  const response = await fetch(url, {
    next: { revalidate: 600 },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const payload: APIResponse<BookData> = await response.json();
  return payload;
};
