import { useQuery } from "@tanstack/react-query";
import { fetchTopicMessage } from "src/api";
import { QueryKeys } from "./types";
import { getCachedTopicData } from "./use-topic-messages";

type IProps = {
  topicId: number;
  number: number;
};

export const useMessageData = ({ topicId, number }: IProps) => {
  return useQuery({
    queryKey: [QueryKeys.TopicMessageData, topicId, number],
    queryFn: async ({ client }) => {
      const cachedTopicData = getCachedTopicData(client, topicId);

      if (cachedTopicData) {
        if (number === 0) {
          return cachedTopicData.item0;
        } else {
          const item = cachedTopicData.list.find((item) => item.n === number);
          if (item) {
            return item;
          }
        }
      }

      const item = await fetchTopicMessage(topicId, number);
      if (item === undefined) {
        throw new Error(`Сообщение ${number} не найдено`);
      }

      return item;
    },
  });
};
