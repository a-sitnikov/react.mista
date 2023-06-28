import { ITopicInfo, ITopicMessage } from "src/store";

export const mock_topicInfo: ITopicInfo = {
  id: 1,
  title: "Тестовая ветка",
  count: 102
}

export const mock_topic_item0: ITopicMessage = {
  id: 1,
  n: 0,
  text: "Пост 0",
  user: "user 0",
  userId: 0,
  time: 1687795190000,
  vote: 0
};

export const mock_topicMessages_p2: ITopicMessage[] = [
  {
    id: 1,
    n: 101,
    text: "Пост 101",
    user: "user 1",
    userId: 1,
    time: 1687795290000,
    vote: 0
  },
  {
    id: 1,
    n: 102,
    text: "Пост 102",
    user: "user 2",
    userId: 2,
    time: 1687795390000,
    vote: 0
  },
]

