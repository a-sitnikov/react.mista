import { FC, ReactElement } from "react";
import { Link } from "react-router-dom";

import "./topic_preview.css";

type IProps = {
  topicId: number;
  onFirst: () => void;
  onLast: () => void;
  onPrev: () => void;
  onNext: () => void;
  close: () => void;
};

const PreviewButtons: React.FC<IProps> = ({
  topicId,
  onFirst,
  onPrev,
  onNext,
  onLast,
  close,
}) => {
  return (
    <div className="topic-preview-rewind">
      <div
        className="topic-preview-button flex-small"
        onClick={onFirst}
        title="К первому"
      >
        <i className="fa fa-angle-double-left" aria-hidden="true"></i>
      </div>
      <div
        className="topic-preview-button flex-large"
        onClick={onPrev}
        title="К предыдущему"
      >
        <i className="fa fa-angle-left" aria-hidden="true"></i>
      </div>
      <div
        className="topic-preview-button flex-large"
        onClick={onNext}
        title="К следующему"
      >
        <i className="fa fa-angle-right" aria-hidden="true"></i>
      </div>
      <div
        className="topic-preview-button flex-small"
        onClick={onLast}
        title="К последнему"
      >
        <i className="fa fa-angle-double-right" aria-hidden="true"></i>
      </div>
      <div className="topic-preview-button close-preview" onClick={close}>
        <i className="fa fa-angle-right" aria-hidden="true"></i>
        <i
          className="fa fa-angle-left"
          aria-hidden="true"
          style={{ marginLeft: "-2px" }}
        ></i>
      </div>
      <div className="topic-preview-button edit-preview">
        <Link to={`/topic.php?id=${topicId}&page=last20#F`}>
          <i
            className="fa fa-pencil"
            aria-hidden="true"
            style={{ color: "var(--font-color)" }}
          ></i>
        </Link>
      </div>
    </div>
  );
};

export default PreviewButtons;
