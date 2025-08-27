import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { fetchTopicsList } from "src/api";
import { useAppSelector } from "../hooks";
import { type ITopicsListItem } from "../slices";
import { QueryKeys } from "./types";

type IProps = {
  searchParams: URLSearchParams;
};

export const useTopicsList = <TError = Error, TData = ITopicsListItem[]>(
  { searchParams }: IProps,
  options?: Omit<
    UseQueryOptions<
      ITopicsListItem[],
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
