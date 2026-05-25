import { type ISectionItem } from "src/store";
import { groupBy } from "src/utils";
import { fetchAndGetJson } from "./api-utils";
import { urlSections } from ".";

export const fetchSections = async (): Promise<{
  items: ISectionItem[];
  tree: { [key: string]: ISectionItem[] };
}> => {
  const items: ISectionItem[] = await fetchAndGetJson(urlSections);

  return {
    items,
    tree: groupBy(items, (item) => item.arena),
  };
};

export type TFetchSectionsData = Awaited<ReturnType<typeof fetchSections>>;
