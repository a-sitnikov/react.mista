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
import { getMaxPage, extractTextFromHTML, toNumber } from "src/utils";
import { useActionCreators, useAppDispatch } from "src/store";

import "./topic.css";
import { useTopicMessages } from "src/store/query-hooks";

const getPageNumber = (locationPage: string): number | "last20" => {
  if (locationPage === "last20") return "last20";
  return toNumber(locationPage, 1);
};

const Topic = (): ReactElement => {
  const dispatch = useAppDispatch();
  const actions = useActionCreators(topicActions);
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const topicId = +searchParams.get("id");
  const { data, error, isPending } = useTopicMessages({ topicId });

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
      if (timer) clearInterval(timer);
    };
    return clearStore;
  }, [actions, updateNewMessages]);

  useEffect(() => {
    if (isPending) return;
    if (!location.hash) return;

    const nodeHash = document.getElementById(location.hash.slice(1));
    if (nodeHash) {
      window.scrollTo(0, nodeHash.offsetTop);
    }
  }, [isPending, location.hash]);

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
