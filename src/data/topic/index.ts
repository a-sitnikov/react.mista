export interface IVotingItem {
  text: string,
  count: number
}

export interface ITopicInfo {
    id: number,
    title: string,
    forum?: string,
    sectionId?: string,
    created?: number,
    authorId?: string,
    author?: string,
    updated?: number,
    lastUser?: string,
    count?: number,
    down?: number,
    closed?: number,
    deleted?: number,
    isVoting?: number,
    voting?: IVotingItem[]
  }

export interface ITopicMessage {
  id: number,
  n: number,
  user: string,
  userId: number,
  text: string,
  time: number,
  vote: number
}

export interface ITopicMessagesList extends Array<ITopicMessage> {}

export interface ITopicState {
  status: "init" | "loading" | "success" | "error",
  items: ITopicMessagesList,
  item0?: ITopicMessage,
  info?: ITopicInfo,
  error?: string,
  lastUpdated?: number
}

export const defaultInfo: ITopicInfo = {
  id: 0,
  title: "",
  count: -1
}

export const initialState: ITopicState = {
  status: "init",
  items: [],
  info: defaultInfo
}