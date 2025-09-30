interface Content {
  title: string;
  body_html: string;
  body_text: string;
}

export const getVistorServices = async () => {
  const url = `${process.env.API}vistor-services?per_page=100`;
  const response = await fetch(url, {
    next: { revalidate: 600 },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const payload: APIResponse<Content[]> = await response.json();
  return payload;
};
