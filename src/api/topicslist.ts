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

interface IAPIRequest {
  topics?: number | null,
  utime?: string | null,
  forum?: string | null,
  section_short_name?: string | null,
  user_id?: string | null,
  mytopics?: string | null
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

function convertRequest(request?: IRequest): IAPIRequest {

  const itemsPerPage: number = request?.itemsPerPage ?? 20;
  const page: number = request?.page ?? 1;
  const count = itemsPerPage * page;

  return ({
    topics: count,
    utime: request?.beforeTime,
    forum: request?.forum,
    section_short_name: request?.section,
    user_id: request?.user_id,
    mytopics: request?.myTopics
  })

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