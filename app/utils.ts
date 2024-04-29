// utils.ts

interface QueryParams {
  [key: string]: string;
}

export const constructURL = (
  baseURL: string,
  queryParams: QueryParams
): string => {
  let url = baseURL;
  const queryString = Object.keys(queryParams)
    .filter((key) => queryParams[key] !== "") // Exclude empty values
    .map((key) => `${key}=${encodeURIComponent(queryParams[key])}`)
    .join("&");
  if (queryString !== "") {
    url += `?${queryString}`;
  }
  return url;
};
