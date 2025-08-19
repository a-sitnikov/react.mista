import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { fetchTopicsList, TFetchTopicsListData } from "src/api";
import { QueryKeys } from "./types";
import { useAppSelector } from "../hooks";

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
      [QueryKeys.TopicsList, ...string[]]
    >,
    "queryKey" | "queryFn"
  >
) => {
  const itemsPerPage = useAppSelector(
    (state) => state.options.items.topicsPerPage
  );

  return useQuery({
    queryKey: [QueryKeys.TopicsList, ...Object.values(searchParams)],
    queryFn: () => {
      const params = Object.fromEntries(searchParams);
      return fetchTopicsList({ itemsPerPage, ...params });
    },
    placeholderData: (previousData) => previousData ?? [],
    refetchOnWindowFocus: false,
    ...options,
  });
};
