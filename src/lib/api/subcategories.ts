type response = {
  success: boolean;
  message: string;
  data: category[];
};
export const getConstitutionSub = async () => {
  const url = `${process.env.API}rulings/constitution/subcategories`;
  const response = await fetch(url, {
    next: { revalidate: 600 },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const payload: response = await response.json();
  return payload;
};
export const getTechnicalOfficeSub = async () => {
  const url = `${process.env.API}rulings/technical-office/subcategories`;
  const response = await fetch(url, {
    next: { revalidate: 600 },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const payload: response = await response.json();
  return payload;
};
export const getLegalPrinciplesSub = async () => {
  const url = `${process.env.API}rulings/legal-principles/subcategories`;
  const response = await fetch(url, {
    next: { revalidate: 600 },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const payload: response = await response.json();
  return payload;
};
export const getAssemblySub = async () => {
  const url = `${process.env.API}assembly-categories?per_page=5`;
  const response = await fetch(url, {
    next: { revalidate: 600 },
  });
  console.log(response);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  console.log(response);
  const payload: response = await response.json();
  console.log(payload);

  return payload;
};
