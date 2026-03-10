export const getSiteSettings = async (): Promise<SiteSettingsResponse> => {
  const url = `${process.env.API}page-settings`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  const payload: SiteSettingsResponse = await response.json();

  return payload;
};
