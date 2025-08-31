interface responseType {
  data: questionCategory[];
  meta: PaginationMeta;
}
interface questionResponseType {
  data: Iquestion[];
  meta: PaginationMeta;
}
export const getQuestionCategories = async () => {
  const url = `${process.env.API}question-categories?per_page=100`;
  try {
    const response = await fetch(url, {
      cache: "no-store",
    });
    console.log(response);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const payload: responseType = await response.json();

    return payload;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
};
export const getAllQuestion = async (
  category_id?: string,
  per_page?: number,
  page?: number,
  search?: string
) => {
  const baseUrl = `/api/questions`;
  const params = new URLSearchParams();

  if (category_id) {
    params.append("category_id", category_id);
  }

  if (per_page) {
    params.append("per_page", per_page.toString());
  }

  if (page) {
    params.append("page", page.toString());
  }

  if (search) {
    params.append("search", search);
  }

  const url = params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;

  try {
    const response = await fetch(url, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const payload: questionResponseType = await response.json();
    return payload;
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
};
