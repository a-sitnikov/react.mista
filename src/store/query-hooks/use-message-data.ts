import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "./types";
import { getCachedTopicData } from "./use-topic-messages";
import { fetchTopicMessage } from "src/api";

interface IProps {
  topicId: number;
  number: number;
}

export const useMessageData = ({ topicId, number }: IProps) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: [QueryKeys.TopicMessageData, topicId, number],
    queryFn: async () => {
      const cachedTopicData = getCachedTopicData(queryClient, topicId);

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
