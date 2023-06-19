import { fetchJsonpAndGetJson, urlSections } from '.'
import type { ISectionsList, ISectionItem } from 'src/store/sections'

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

export const fetchSections = async (): Promise<ISectionsList> => {
  const list = await fetchJsonpAndGetJson(urlSections);
  return list.map(convertResponse);
}
