import { groupBy } from "src/utils";
import { urlSections } from ".";
import { fetchJsonpAndGetJson } from "./api-utils";
import type { ISectionItem } from "src/store";

interface IAPIResponse {
  id: number;
  forum: string;
  shortn: string;
  fulln: string;
}

function convertResponse(response: IAPIResponse): ISectionItem {
  return {
    id: response.id,
    forum: response.forum,
    code: response.shortn,
    name: response.fulln,
  };
}

export const fetchSections = async (): Promise<{
  items: ISectionItem[];
  tree: { [key: string]: ISectionItem[] };
}> => {
  const list = await fetchJsonpAndGetJson(urlSections);
  const items = list.map(convertResponse);
  return {
    items,
    tree: groupBy(items, (item) => item.forum),
  };
};
