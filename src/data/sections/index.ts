export interface ISectionItem {
  id: number;
  forum: string,
  code: string,
  name: string,
}

export interface ISectionsList extends Array<ISectionItem> {}

export interface ISectionsTree{
  [key: string]: ISectionItem[]
}

export interface ISectionsListState {
  status: "init" | "loading" | "success" | "error";
  items: ISectionsList,
  tree?: {},
  error?: string,
  lastUpdated?: number
}

export const initialState: ISectionsListState = {
  status: "init",
  items: [],
  tree: {}
}