export interface ITopicsListItem {
  id: number;
  author: string;
  lastUser: string;
  forum: string;
  sectionCode: string;
  section: string;
  count: number;
  text: string;
  created: number;
  updated: number;
  closed: boolean;
  down: boolean;
  pinned: boolean;
  isVoting: boolean;
}
