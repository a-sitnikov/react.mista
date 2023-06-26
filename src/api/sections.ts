import { fetchJsonpAndGetJson, urlSections } from '.'
import type { ISectionItem } from 'src/store'

interface IAPIResponse {
  id: number,
  forum: string,
  shortn: string,
  fulln: string
}

function convertResponse(response: IAPIResponse): ISectionItem {

  return ({
    id: response.id,
    forum: response.forum,
    code: response.shortn,
    name: response.fulln,
  })

}

export const fetchSections = async (): Promise<ISectionItem[]> => {
  const list = await fetchJsonpAndGetJson(urlSections);
  return list.map(convertResponse);
}
