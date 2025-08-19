import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { fetchSections, TFetchSectionsData } from "src/api";
import { QueryKeys } from "./types";

export const useSections = <TError = Error, TData = TFetchSectionsData>(
  options?: Omit<
    UseQueryOptions<TFetchSectionsData, TError, TData, [QueryKeys.Sections]>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({
    queryKey: [QueryKeys.Sections],
    queryFn: fetchSections,
    placeholderData: { items: [], tree: {} },
    refetchOnWindowFocus: false,
    ...options,
  });
};
