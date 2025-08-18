import { useSearchParams } from "react-router-dom";
import { fetchTopic } from "../slices";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "./types";

interface IUseTopicMessagesProps {
  topicId: number;
}

export type TFetchTopicData =
  | Awaited<ReturnType<typeof fetchTopic>>
  | undefined;

export const useTopicMessages = (
  { topicId }: IUseTopicMessagesProps,
  options?: { select?: (data: TFetchTopicData) => any }
) => {
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page");

  const queryClient = useQueryClient();

  return useQuery({
    queryKey: [QueryKeys.TopicMessages, topicId, page],
    queryFn: () => {
      const cacheData = getCachedTopicData(queryClient, topicId);
      return fetchTopic({ topicId, page, item0: cacheData?.item0 });
    },
    placeholderData: (previousData) => previousData,
    ...options,
  });
};

export const getCachedTopicData = (queryClient: any, topicId: number) => {
  const topicQueries = queryClient.getQueriesData({
    queryKey: [QueryKeys.TopicMessages, topicId],
  });

  if (topicQueries.length === 0) return undefined;

  return topicQueries[0][1] as TFetchTopicData;
};
