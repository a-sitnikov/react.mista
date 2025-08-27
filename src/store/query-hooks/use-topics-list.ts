import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { fetchTopicsList, type TFetchTopicsListData } from "src/api";
import { useAppSelector } from "../hooks";
import { QueryKeys } from "./types";

type IProps = {
  searchParams: URLSearchParams;
};

export const useTopicsList = <TError = Error, TData = TFetchTopicsListData>(
  { searchParams }: IProps,
  options?: Omit<
    UseQueryOptions<
      TFetchTopicsListData,
      TError,
      TData,
      [QueryKeys.TopicsList, object]
    >,
    "queryKey" | "queryFn"
  >
) => {
  const itemsPerPage = useAppSelector(
    (state) => state.options.items.topicsPerPage
  );

  return useQuery({
    queryKey: [QueryKeys.TopicsList, Object.fromEntries(searchParams)],
    queryFn: async ({ queryKey }) => {
      const params = queryKey[1];
      return fetchTopicsList({ itemsPerPage, ...params });
    },
    placeholderData: (previousData) => previousData ?? [],
    ...options,
  });
};
