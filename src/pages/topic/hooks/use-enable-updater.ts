import { useEffect, useState } from "react";
import { useAppSelector } from "src/store";
import { toNumber } from "src/utils";

interface IProps {
  isLastPage: boolean;
}

export const useEnableUpdater = ({ isLastPage }: IProps) => {
  const [enableRefresh, refreshInterval] = useAppSelector((state) => [
    state.options.items.autoRefreshTopic,
    toNumber(state.options.items.autoRefreshTopicInterval, 60) * 1000,
  ]);

  const [enableUpdater, setEnableUpdater] = useState(false);
  useEffect(() => {
    if (enableRefresh === "true" && isLastPage) {
      setTimeout(() => setEnableUpdater(true), refreshInterval);
    }
  }, [enableRefresh, refreshInterval, isLastPage]);

  return {
    enableUpdater,
    refreshInterval,
  };
};
