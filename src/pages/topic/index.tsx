import { ReactElement, useCallback, useEffect } from "react";

import { useLocation, useSearchParams } from "react-router-dom";
import {
  topicActions,
  getNewMessagesIfNeeded,
  useAppSelector,
} from "src/store";
import { newMessageActions } from "src/store";

import Error from "src/components/common/error";
import Pages from "src/components/common/pages";
import Header from "./header";
import TopicInfo from "./topic_info";
import Row from "../../pages/topic/row";
import Footer from "./footer";
import NewMessage from "./new_message";
import { getMaxPage, extractTextFromHTML } from "src/utils";
import { useActionCreators, useAppDispatch } from "src/store";

import "./topic.css";
import { useTopicMessages } from "src/store/query-hooks";

var scrolledToHash: boolean;

const getPageNumber = (locationPage: string | string[]): number | "last20" => {
  if (!locationPage) return 1;
  if (locationPage === "last20") return "last20";
  if (isNaN(+locationPage)) return 1;
  return +locationPage;
};

const Topic = (): ReactElement => {
  const dispatch = useAppDispatch();
  const actions = useActionCreators(topicActions);
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const topicId = +searchParams.get("id");
  const { data, error } = useTopicMessages({ topicId });

  const { info, item0, list: items = [] } = data ?? {};

  const login = useAppSelector((state) => state.login);

  const page = getPageNumber(searchParams.get("page"));
  const maxPage = getMaxPage(info?.count);

  const isLastPage = page === "last20" || page === maxPage;

  const updateNewMessages = useCallback(() => {
    if (isLastPage) dispatch(getNewMessagesIfNeeded());
  }, [dispatch, isLastPage]);

  const onPostNewMessageSuccess = () => {
    updateNewMessages();
    dispatch(newMessageActions.changeText(""));
  };

  useEffect(() => {
    if (info?.title) {
      document.title = extractTextFromHTML(info.title);
    }
  }, [info?.title]);

  useEffect(() => {
    const timer = window.setInterval(updateNewMessages, 60 * 1000);

    const clearStore = () => {
      actions.clear();
      scrolledToHash = undefined;
      if (timer) clearInterval(timer);
    };
    return clearStore;
  }, [actions, updateNewMessages]);

  useEffect(() => {
    if (!scrolledToHash && location.hash && items.length > 0) {
      const nodeHash = document.getElementById(location.hash.slice(1));
      if (nodeHash) setTimeout(() => window.scrollTo(0, nodeHash.offsetTop), 1);
      scrolledToHash = true;
    }
  });

  return (
    <div style={{ marginBottom: "5px" }}>
      <Header />
      {error && <Error text={error.message} />}
      <div className="topic-table">
        <TopicInfo topicId={topicId} />
        <Row key="0" data={item0} topicId={topicId} />
        {items.map((item, i) => (
          <Row key={item.n} data={item} topicId={topicId} />
        ))}
        {(maxPage > 1 || page === "last20") && (
          <div className="table-footer">
            <Pages maxPage={maxPage} last20 />
          </div>
        )}
      </div>
      <Footer page={page} />
      {login.logged && <NewMessage onSubmitSuccess={onPostNewMessageSuccess} />}
    </div>
  );
};

export default Topic;
