export interface ITopicsListItem {
  id: string;
  text: string;
  count: number;
  forum: string;
  section?: string;
  author: {
    id: string;
    name: string;
  };
  updated: string;
  paid?: boolean;
  closed?: boolean;
  down?: boolean;
  pinned: boolean;
  isVoting?: boolean;
}
