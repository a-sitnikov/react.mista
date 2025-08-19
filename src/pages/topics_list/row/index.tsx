import { useState } from "react";

import AuthorCell from "./author-cell";
import CountCell from "./count-cell";
import ForumCell from "./forum-cell";
import Last20Cell from "./last20-cell";
import LastUserCell from "./last-user-cell";
import ShowPreviewButton from "./show_preview_button";
import TopicNameCell from "./topic_name_cell";
import TopicPreview from "src/components/preview/topic_preview";

import { ITopicsListItem } from "src/store";

type IProps = {
  item: ITopicsListItem;
};

const Row: React.FC<IProps> = ({ item }) => {
  const [previewNumber, setPreviewNumber] = useState<number>();

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
