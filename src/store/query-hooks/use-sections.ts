import { useQuery } from "@tanstack/react-query";
import { fetchSections } from "src/api";

export const useSections = () => {
  return useQuery({
    queryKey: ["sections"],
    queryFn: fetchSections,
    placeholderData: { items: [], tree: {} },
    refetchOnWindowFocus: false,
  });
};
