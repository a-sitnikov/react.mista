import { type ITopicsList, type ITopicsListItem } from "src/store";
import { toNumber } from "src/utils";
import { fetchAndGetJson } from "./api-utils";
import { urlTopicsList } from ".";

export interface ITopicsListRequest {
  itemsPerPage?: number | string | null;
  page?: number | string | null;
  beforeTime?: string | null;
  forum?: string | null;
  section?: string | null;
  userId?: string | null;
  myTopics?: string | null;
}

interface IAPIRequest {
  topics?: string;
  section_short_name?: string;
  forum?: string;
  user_id?: string;
  mytopics?: string;
}

interface IAPIResponse {
  id: number;
  forum: string;
  sect1: string;
  sect2: string;
  v8: string;
  closed: number;
  down: number;
  paid: number;
  text: string;
  message: string;
  created: number;
  utime: number;
  user: string;
  user0: string;
  is_voting: number;
  answ: number;
}

function convertRequest(request: ITopicsListRequest): IAPIRequest {
  const page = toNumber(request.page, 1);
  const itemsCount = toNumber(request.itemsPerPage, 20) * page;

  return {
    topics: String(itemsCount),
    section_short_name: request.section,
    forum: request.forum,
    user_id: request.userId,
    mytopics: request.myTopics,
  };
}

function convertResponse(response: IAPIResponse): ITopicsListItem {
  return {
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
  };
}

async function fetchTopicsList(
  params?: ITopicsListRequest
): Promise<ITopicsList> {
  const request = convertRequest(params);

  const itemsPerPage = toNumber(params?.itemsPerPage, 20);

  const list = await fetchAndGetJson(urlTopicsList, request);
  return list.map(convertResponse).slice(-itemsPerPage);
}

export { fetchTopicsList };
export type TFetchTopicsListData = Awaited<ReturnType<typeof fetchTopicsList>>;
