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

const apiTopicSchema = z.object({
  id: z.string(),
  text: z.string(),
  count: z.number(),
  forum: z.string(),
  section: z.string().optional(),
  author: z.object({
    id: z.string(),
    name: z.string(),
  }),
  updated: z.string(),
  down: z.boolean().optional(),
  isVoting: z.boolean().optional(),
  closed: z.boolean().optional(),
  paid: z.boolean().optional(),
  pinned: z.boolean().optional(),
});

export const topicsListResponseSchema = z.object({
  ok: z.boolean(),
  data: apiTopicSchema.array(),
});

function convertRequest(request: ITopicsListRequest): IAPIRequest {
  const page = toNumber(request.page, 1);

  return {
    section_short_name: request.section,
    forum: request.forum,
    user_id: request.userId,
    mytopics: request.myTopics,
  };
}

async function fetchTopicsList(
  params?: ITopicsListRequest,
): Promise<z.infer<typeof topicsListResponseSchema>> {
  const data = await fetchAndGetJson(urlTopicsList);

  try {
    return topicsListResponseSchema.parse(data);
  } catch (e) {
    console.log(data);
    console.log(e);
    throw new Error("Ошибка при преобразовании json");
  }
}

export { fetchTopicsList };
