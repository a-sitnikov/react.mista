import { useEffect, useState } from "react";

import TopicPreview from "src/components/preview/topic_preview";
import { type ITopicsListItem } from "src/store";
import AuthorCell from "./author-cell";
import CountCell from "./count-cell";
import ForumCell from "./forum-cell";
import LastUserCell from "./last-user-cell";
import Last20Cell from "./last20-cell";
import ShowPreviewButton from "./show_preview_button";
import TopicNameCell from "./topic_name_cell";

type IProps = {
  item: ITopicsListItem;
  isFetching?: boolean;
};

const Row: React.FC<IProps> = ({ item, isFetching }) => {
  const [previewNumber, setPreviewNumber] = useState<number>();

  useEffect(() => {
    if (isFetching) {
      setPreviewNumber(undefined);
    }
  }, [isFetching]);

  const previewShowFirst = () => {
    if (previewNumber === undefined) {
      setPreviewNumber(0);
    } else {
      setPreviewNumber(undefined);
    }
  };

  const previewShowLast = () => {
    if (previewNumber === undefined || previewNumber !== item.count) {
      setPreviewNumber(item.count);
    } else {
      setPreviewNumber(undefined);
    }
  };

  return (
    <>
      <div className="topics-list-row">
        <ForumCell item={item} />
        <div className="cell-section">{item.section}</div>
        <CountCell item={item} onClick={previewShowLast} />
        <ShowPreviewButton
          expanded={previewNumber !== undefined}
          onClick={previewShowFirst}
        />
        <TopicNameCell data={item} />
        <AuthorCell item={item} />
        <LastUserCell item={item} />
        <Last20Cell item={item} />
      </div>
      {previewNumber !== undefined && (
        <TopicPreview
          topicId={item.id}
          initialMsgNumber={previewNumber}
          author={item.author}
          close={() => setPreviewNumber(undefined)}
        />
      )}
    </>
  );
};

export default Row;
