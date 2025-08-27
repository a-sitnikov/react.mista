import {
  type QueryClient,
  useQuery,
  type UseQueryOptions,
} from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { fetchTopicMessages } from "src/api";
import { fetchTopic, type TFetchTopicData } from "../slices";
import { QueryKeys } from "./types";

type IProps = {
  topicId: number;
};

export const useTopicMessages = <TError = Error, TData = TFetchTopicData>(
  { topicId }: IProps,
  options?: Omit<
    UseQueryOptions<
      TFetchTopicData,
      TError,
      TData,
      [QueryKeys.TopicMessages, number, ...string[]]
    >,
    "queryKey" | "queryFn"
  >
) => {
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page");

  return useQuery({
    queryKey: [QueryKeys.TopicMessages, topicId, page],
    queryFn: ({ client }) => {
      const cacheData = getCachedTopicData(client, topicId);
      return fetchTopic({ topicId, page, item0: cacheData?.item0 });
    },
    placeholderData: (previousData) => previousData,
    ...options,
  });
};

export const useUpdateMessages = <TError = Error, TData = TFetchTopicData>(
  { topicId }: IProps,
  options?: Omit<
    UseQueryOptions<
      Boolean,
      TError,
      TData,
      [QueryKeys.UpdateTopicMessages, number]
    >,
    "queryKey" | "queryFn"
  >
) => {
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page");

  return useQuery({
    queryKey: [QueryKeys.UpdateTopicMessages, topicId],
    queryFn: async ({ client }) => {
      const cacheData = getCachedTopicData(client, topicId);
      if (!cacheData) return true;

      const data = await fetchTopicMessages({
        id: topicId,
        from: cacheData.info.count + 1,
        to: 1050,
      });

      if (data.length === 0) return true;

      client.setQueryData<TFetchTopicData>(
        [QueryKeys.TopicMessages, topicId, page],
        (prevData) => {
          return {
            info: {
              ...prevData.info,
              count: data.at(-1).n,
            },
            item0: prevData.item0,
            list: [...prevData.list, ...data],
          };
        }
      );

      return true;
    },
    initialData: true,
    refetchOnMount: false,
    ...options,
  });
};

export const getCachedTopicData = (
  queryClient: QueryClient,
  topicId: number
) => {
  const topicQueries = queryClient.getQueriesData({
    queryKey: [QueryKeys.TopicMessages, topicId],
  });

  if (topicQueries.length === 0) return undefined;

  return topicQueries[0][1] as TFetchTopicData;
};
