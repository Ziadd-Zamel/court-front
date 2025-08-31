interface responseType {
  data: mainData[];
  meta: PaginationMeta;
}
interface LawersType {
  data: ILawyer[];
  meta: PaginationMeta;
}

export const getAllFields = async () => {
  const url = `${process.env.API}fields?per_page=100`;
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

export const getAllCircles = async () => {
  const url = `${process.env.API}office-circles?per_page=100`;
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

export const getAllLawyers = async (
  name?: string,
  field?: string,
  search?: string,
  office_circle?: string,
  per_page?: number,
  page?: number
) => {
  const baseUrl = `/api/lawyers`;
  const params = new URLSearchParams();

  if (name) {
    params.append("name", name);
  }

  if (field) {
    params.append("field", field);
  }

  if (search) {
    params.append("search", search);
  }

  if (office_circle) {
    params.append("office_circle", office_circle);
  }

  if (per_page) {
    params.append("per_page", per_page.toString());
  }

  if (page) {
    params.append("page", page.toString());
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

    const payload: LawersType = await response.json();
    return payload;
  } catch (error) {
    console.error("Error fetching lawyers:", error);
    throw error;
  }
};
