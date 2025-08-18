import { fetchTopicMessage, fetchTopicMessages, fetchTopicInfo } from "src/api";
import { toNumber } from "src/utils";

export interface IVotingItem {
  text: string;
  count: number;
}

export interface ITopicInfo {
  id: number;
  title: string;
  forum?: string;
  sectionId?: string;
  created?: number;
  authorId?: string;
  author?: string;
  updated?: number;
  lastUser?: string;
  count?: number;
  down?: number;
  closed?: number;
  deleted?: number;
  isVoting?: number;
  voting?: IVotingItem[];
}

export interface ITopicMessage {
  id: number;
  n: number;
  user: string;
  userId: number;
  text: string;
  time: number;
  vote: number;
}

export interface ITopicMessagesList extends Array<ITopicMessage> {}

const getFirstLastMessageNumber = (count: number, page: number | string) => {
  if (page === "last20") {
    if (count === -1) {
      return [0, 1010];
    } else {
      return [Math.max(0, count - 19), count];
    }
  }

  const pageNum = toNumber(page, 1) - 1;
  return [pageNum * 100, pageNum * 100 + 99];
};

export const fetchTopic = async ({
  topicId,
  page,
  item0,
}: {
  topicId: number;
  page: number | string;
  item0?: ITopicMessage;
}) => {
  let info: ITopicInfo;
  try {
    info = await fetchTopicInfo(topicId);
  } catch (e) {
    console.error(e);
    info = {
      id: topicId,
      title: "",
      count: -1,
    };
  }

  let [first, last] = getFirstLastMessageNumber(info.count, page);
  if (first === 0 && !!item0) {
    first = 1;
  }

  let items: ITopicMessagesList = await fetchTopicMessages({
    id: topicId,
    from: first,
    to: last,
  });

  let _item0 = item0;
  if (first === 0) {
    _item0 = items.shift();
  } else {
    _item0 = await fetchTopicMessage(topicId, 0);
  }

  if (info.count === 0 && items.length > 0) {
    info.count = items[items.length - 1].n;
  }

  if (page === "last20" && items.length > 20) {
    items = items.slice(-20);
  }

  return {
    info,
    item0: _item0,
    list: items,
  };
};
