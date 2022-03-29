import { fetchJsonpAndGetJson, urlSections } from '.'

// Sections
export type ResponseSection = {
  id: number,
  forum: string,
  shortn: string,
  fulln: string,
  id: number
}

export type ResponseSections = Array<ResponseSection>;

export const fetchSections = async (): Promise<ResponseSections> => {
  const json = await fetchJsonpAndGetJson(urlSections);
  return json;
}
