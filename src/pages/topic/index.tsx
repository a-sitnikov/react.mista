import { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import Error from "src/components/common/error";
import Pages from "src/components/common/pages";
import { useAppDispatch, useAppSelector, newMessageActions } from "src/store";

import { useTopicMessages, useUpdateMessages } from "src/store/query-hooks";

import {
  getMaxPage,
  extractTextFromHTML,
  toNumber,
  getPageNumber,
} from "src/utils";
import Row from "../../pages/topic/row";
import Footer from "./footer";
import Header from "./header";
import { useEnableUpdater } from "./hooks/use-enable-updater";
import NewMessage from "./new_message";
import TopicInfo from "./topic_info";

import "./topic.css";

const Topic: React.FC = () => {
  const dispatch = useAppDispatch();
  const { hash } = useLocation();
  const [searchParams] = useSearchParams();

  const topicId = toNumber(searchParams.get("id"), -1);
  const { data, error, isPending } = useTopicMessages({ topicId });

  const { info, item0, list: items = [] } = data ?? {};

  const login = useAppSelector((state) => state.login);

  const page = getPageNumber(searchParams.get("page"));
  const maxPage = getMaxPage(info?.count);

  const isLastPage = page === "last20" || page === maxPage;
  const { enableUpdater, refreshInterval } = useEnableUpdater({ isLastPage });

  const { refetch: updateMessages } = useUpdateMessages(
    { topicId },
    {
      refetchInterval: refreshInterval,
      enabled: enableUpdater,
    }
  );

  const onPostNewMessageSuccess = () => {
    void updateMessages();
    dispatch(newMessageActions.changeText(""));
  };

  useEffect(() => {
    if (info?.title) {
      document.title = extractTextFromHTML(info.title);
    }
  }, [info?.title]);

  useEffect(() => {
    if (isPending) return;
    if (!hash) return;

    const nodeHash = document.getElementById(hash.slice(1));
    if (nodeHash) {
      window.scrollTo(0, nodeHash.offsetTop);
    }
  }, [isPending, hash]);

  return (
    <div style={{ marginBottom: "5px" }}>
      <Header topicId={topicId} />
      {error && <Error text={error.message} />}
      <div className="topic-table">
        <TopicInfo topicId={topicId} />
        <Row item={item0} topicId={topicId} />
        {items.map((item) => (
          <Row key={item.n} item={item} topicId={topicId} />
        ))}
        {(maxPage > 1 || page === "last20") && (
          <div className="table-footer">
            <Pages maxPage={maxPage} last20 />
          </div>
        )}
      </div>
      <Footer topicId={topicId} isLastPage={isLastPage} />
      {login.logged && (
        <NewMessage
          topicId={topicId}
          onSubmitSuccess={onPostNewMessageSuccess}
        />
      )}
    </div>
  );
};

export default Topic;
