import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { fetchSections, type TFetchSectionsData } from "src/api";
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
    ...options,
  });
};
