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

function convertResponse(response: IAPIResponse): ISectionItem {

  return ({
    id: response.id,
    forum: response.forum,
    code: response.shortn,
    name: response.fulln,
  })

}

export const fetchSections = async (): Promise<ResponseSections> => {
  const list = await fetchJsonpAndGetJson(urlSections);
  return list.map(convertResponse);
}
