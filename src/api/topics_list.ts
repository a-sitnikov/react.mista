import { type ITopicsListItem } from "src/store";
import { toNumber } from "src/utils";
import { z } from "zod";
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

export const topicsListSchema = z
  .object({
    id: z.int(),
    forum: z.string(),
    sect1: z.string(),
    sect2: z.string(),
    v8: z.string().nullable().optional(),
    closed: z.int(),
    down: z.int(),
    paid: z.int(),
    text: z.string(),
    message: z.string(),
    created: z.int(),
    utime: z.int(),
    user: z.string().nullable().optional(),
    user0: z.string(),
    is_voting: z.int(),
    answ: z.int(),
  })
  .transform(
    (response) =>
      ({
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
      } as ITopicsListItem)
  )
  .array();

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

async function fetchTopicsList(
  params?: ITopicsListRequest
): Promise<ITopicsListItem[]> {
  const request = convertRequest(params);

  const itemsPerPage = toNumber(params?.itemsPerPage, 20);

  const data = await fetchAndGetJson(urlTopicsList, request);

  try {
    return topicsListSchema.parse(data).slice(-itemsPerPage);
  } catch (e) {
    console.log(data);
    console.log(e);
    throw new Error("Ошибка при преобразовании json");
  }
}

export { fetchTopicsList };
