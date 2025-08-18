import { useQuery } from "@tanstack/react-query";
import { fetchTopicsList } from "src/api";
import { QueryKeys, TOptions } from "./types";
import { useAppSelector } from "../hooks";

interface IProps {
  searchParams: URLSearchParams;
}

export const useTopicsList = ({ searchParams }: IProps, options?: TOptions) => {
  const itemsPerPage = useAppSelector(
    (state) => state.options.items.topicsPerPage
  );

  return useQuery({
    queryKey: [QueryKeys.TopicsList, ...searchParams],
    queryFn: () => {
      const params = Object.fromEntries(searchParams);
      return fetchTopicsList({ itemsPerPage, ...params });
    },
    placeholderData: (previousData) => previousData,
    refetchOnWindowFocus: false,
    ...options,
  });
};
