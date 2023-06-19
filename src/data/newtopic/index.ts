import { ISectionItem } from "src/store/sections";

export type NewTopicState = {
  isFetching: boolean,
  section: ISectionItem,
  text: string,
  subject: string,
  forum: string,
  isVoting: boolean,
  error?: string
};

export const initialState: NewTopicState = {
  isFetching: false,
  section: null,
  text: '',
  subject: '',
  forum: '1C',
  isVoting: false
}