import { useQuery } from "@tanstack/react-query";
import { fetchTopicsList } from "src/api";
import { QueryKeys } from "./types";
import { useAppSelector } from "../hooks";

export const useTopicsList = ({
  searchParams,
}: {
  searchParams: URLSearchParams;
}) => {
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
  });
};
