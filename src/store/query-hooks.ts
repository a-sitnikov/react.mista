import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchSections, fetchTopicsList } from "src/api";
import { useAppSelector } from "./hooks";
import { useSearchParams } from "react-router-dom";
import { fetchTopic } from "./slices";

export const useSections = () => {
  return useQuery({
    queryKey: ["sections"],
    queryFn: fetchSections,
    placeholderData: { items: [], tree: {} },
  });
};

export const useTopicsList = ({
  searchParams,
}: {
  searchParams: URLSearchParams;
}) => {
  const itemsPerPage = useAppSelector(
    (state) => state.options.items.topicsPerPage
  );

  return useQuery({
    queryKey: ["topics-list", ...searchParams],
    queryFn: () => {
      const params = Object.fromEntries(searchParams);
      return fetchTopicsList({ itemsPerPage, ...params });
    },
    placeholderData: (previousData) => previousData,
  });
};

interface IUseTopicMessagesProps {
  topicId: number;
}

type TFetchTopicData = Awaited<ReturnType<typeof fetchTopic>> | undefined;

export const useTopicMessages = (
  { topicId }: IUseTopicMessagesProps,
  options?: { select?: (data: TFetchTopicData) => any }
) => {
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page");

  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["topic-messages", topicId, page],
    queryFn: () => {
      const cacheData = queryClient.getQueryData<TFetchTopicData>([
        "topic-messages",
        topicId,
      ]);
      return fetchTopic({ topicId, page, item0: cacheData?.item0 });
    },
    placeholderData: (previousData) => previousData,
    ...options,
  });
};
