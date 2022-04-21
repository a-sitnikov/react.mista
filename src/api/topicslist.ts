import { fetchAndGetJson, urlTopicsList } from '.'

import type { ITopicsList, ITopicsListItem } from 'src/data/topicslist'

export interface IRequest {
  itemsPerPage?: number | null,
  page?: number | null,
  beforeTime?: string | null,
  forum?: string | null,
  section?: string | null,
  user_id?: string | null,
  myTopics?: string | null
}

interface IAPIResponse {
  id: number,
  forum: string,
  sect1: string,
  sect2: string,
  v8: string,
  closed: number,
  down: number,
  paid: number,
  text: string,
  message: string,
  created: number,
  utime: number,
  user: string,
  user0: string,
  is_voting: number,
  answ: number
}

function convertResponse(response: IAPIResponse): ITopicsListItem {

  return ({
    id: response.id,
    forum: response.forum,
    section: response.sect1,
    sectionCode: response.sect2,
    author: response.user0,
    lastUser: response.user,
    created: response.created * 1000,
    updated: response.utime * 1000,
    count: response.answ,
    text: response.text,
    closed: response.closed === 1,
    down: response.down === 1,
    pinned: response.utime === 2147483648,
    isVoting: response.is_voting === 1,
    showPreview: false
  })

}

async function fetchTopicsList(params?: IRequest): Promise<ITopicsList> {

  //const request = convertRequest(params);

  const list = await fetchAndGetJson(urlTopicsList, params);
  return list.map(convertResponse);

}

export { fetchTopicsList }