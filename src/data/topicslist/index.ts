export interface ITopicsListItem {
  id: number,
  author: string,
  lastUser: string,
  forum: string,
  sectionCode: string,
  section: string,
  count: number,
  text: string,
  created: number,
  updated: number,
  closed: boolean,
  down: boolean,
  pinned: boolean
  isVoting: boolean,
  showPreview: boolean,
  previewMsgNumber?: number
}

export interface ITopicsList extends Array<ITopicsListItem> { }

export interface ITopicsListState {
  status: "init" | "loading" | "success" | "error";
  items: ITopicsList,
  error?: string,
  lastUpdated?: number
}

export const initialState: ITopicsListState = {
  status: "init",
  items: []
}