import { useQuery } from "@tanstack/react-query";
import { fetchSections, fetchTopicsList } from "src/api";
import { useAppSelector } from "./hooks";

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
