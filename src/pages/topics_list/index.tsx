import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import Error from "src/components/common/error";
import Pages from "src/components/common/pages";
import { useTopicsList } from "src/store/query-hooks";

import Header from "./header";
import NewTopic from "./new_topic";
import Row from "./row";
import TableHeader from "./table_header";

import "./topics_list.css";

const TopicsList: React.FC = () => {
  const [searchParams] = useSearchParams();

  const {
    isFetching,
    data: items,
    error,
    refetch,
  } = useTopicsList({ searchParams });

  useEffect(() => {
    document.title = "React.Mista";
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [searchParams]);

  return (
    <div>
      <Header />
      {error && <Error text={error.message} />}
      <div className="topic-list-table">
        <TableHeader onUpdateClick={refetch} isLoading={isFetching} />
        {(items ?? []).map((item) => (
          <Row key={item.id} item={item} isFetching={isFetching} />
        ))}
        <div className="table-footer">
          <Pages maxPage={10} />
        </div>
      </div>
      <div
        id="F"
        className="newtopic"
        style={{ marginBottom: "10px", marginTop: "5px", position: "relative" }}
      >
        <NewTopic onSubmitSuccess={refetch} />
      </div>
    </div>
  );
};

export default TopicsList;
