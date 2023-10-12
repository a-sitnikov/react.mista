import { ReactElement, useCallback, useEffect, useRef } from "react";

import { useLocation } from "react-router-dom";
import {
  topicActions,
  getTopicIfNeeded,
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

  const login = useAppSelector((state) => state.login);
  const info = useAppSelector((state) => state.topic.info);
  const item0 = useAppSelector((state) => state.topic.item0);
  const items = useAppSelector((state) => state.topic.items);
  const error = useAppSelector((state) => state.topic.error);

  let locationParams = new URLSearchParams(location.search);
  const topicId = +locationParams.get("id");
  const page = getPageNumber(locationParams.get("page"));
  const maxPage = getMaxPage(info.count);

  const isLastPageRef = useRef(false);
  isLastPageRef.current = page === "last20" || page === maxPage;

  const updateNewMessages = useCallback(() => {
    if (isLastPageRef.current) dispatch(getNewMessagesIfNeeded());
  }, [dispatch]);

  const onPostNewMessageSuccess = () => {
    updateNewMessages();
    dispatch(newMessageActions.changeText(""));
  };

  useEffect(() => {
    if (info.title) document.title = extractTextFromHTML(info.title);
  }, [info.title]);

  useEffect(() => {
    dispatch(getTopicIfNeeded(topicId, page));
  }, [dispatch, topicId, page]);

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
      {error && <Error text={error} />}
      <div className="topic-table">
        <TopicInfo />
        <Row key="0" data={item0} />
        {items.map((item, i) => (
          <Row key={item.n} data={item} />
        ))}
        {(maxPage > 1 || page === "last20") && (
          <div className="tf">
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
