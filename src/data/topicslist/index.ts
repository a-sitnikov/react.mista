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
  showPreview: boolean
}

export interface ITopicsList extends Array<ITopicsListItem> { }

export interface ITopicsListState {
  isFetching: boolean;
  items: ITopicsList,
  error?: string,
  lastUpdated?: number
}

export const initialState: ITopicsListState = {
  isFetching: false,
  items: []
}