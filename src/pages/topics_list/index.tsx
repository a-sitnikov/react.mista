import { ReactElement, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

import { useAppDispatch, useAppSelector } from "src/store";
import { getTopicsListIfNeeded } from "src/store";

import Header from "./header";
import TableHeader from "./table_header";
import Row from "./row";
import Pages from "src/components/common/pages";
import NewTopic from "./new_topic";
import Error from "src/components/common/error";

import TopicPreview from "src/components/preview/topic_preview";

import "./topics_list.css";

const TopicsList = (): ReactElement => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.topicsList.items);
  const status = useAppSelector((state) => state.topicsList.status);
  const error = useAppSelector((state) => state.topicsList.error);
  const loggedUserId = useAppSelector((state) => state.login.userId);

  const location = useLocation();

  const updateTopicsList = useCallback(
    (locationParams) => {
      dispatch(getTopicsListIfNeeded(locationParams));
    },
    [dispatch]
  );

  useEffect(() => {
    document.title = "React.Mista";
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname, location.search]);

  useEffect(() => {
    const locationParams = queryString.parse(location.search);
    updateTopicsList(locationParams);
  }, [location.search, updateTopicsList]);

  let rows = new Array(items.length);
  for (let item of items) {
    rows.push(<Row key={item.id} {...item} topicId={item.id} />);

    if (item.showPreview)
      rows.push(
        <TopicPreview
          key={`preview${item.id}`}
          topicId={item.id}
          initialMsgNumber={item.previewMsgNumber}
          author={item.author}
          loggedUserId={loggedUserId}
        />
      );
  }

  return (
    <div>
      <Header />
      {error && <Error text={error} />}
      <div className="topic-list-table">
        <TableHeader
          onUpdateClick={updateTopicsList}
          isLoading={status === "loading"}
        />
        {rows}
        <div className="tf">
          <Pages maxPage={10} />
        </div>
      </div>
      <div
        id="F"
        className="newtopic"
        style={{ marginBottom: "10px", marginTop: "5px", position: "relative" }}
      >
        <NewTopic onSubmitSuccess={updateTopicsList} />
      </div>
    </div>
  );
};

export default TopicsList;
