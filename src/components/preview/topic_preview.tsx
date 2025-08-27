import { useCallback, useState } from "react";
import { type SwipeEventData, useSwipeable } from "react-swipeable";
import { fetchTopicInfo } from "src/api";
import { useAppSelector } from "src/store";

import PreviewButtons from "./preview_buttons";
import PreviewContent from "./preview_content";
import "./topic_preview.css";

type IProps = {
  topicId: number;
  initialMsgNumber: number;
  author: string;
  close: () => void;
};

const TopicPreview: React.FC<IProps> = ({
  topicId,
  initialMsgNumber,
  author,
  close,
}) => {
  const loggedUserId = useAppSelector((state) => state.login.userId);

  const [deltaX, setDeltaX] = useState(0);
  const [display, setDispaly] = useState("none");
  const [state, setState] = useState({
    msgNumber: initialMsgNumber,
    key: 0,
  });

  const onClickFirst = () => {
    setState({
      msgNumber: 0,
      key: state.key,
    });
  };

  const onClickNext = () => {
    setState({
      msgNumber: state.msgNumber + 1,
      key: state.key,
    });
  };

  const onClickPrev = () => {
    if (state.msgNumber > 0)
      setState({
        msgNumber: state.msgNumber - 1,
        key: state.key,
      });
  };

  const onClickLast = async () => {
    const info = await fetchTopicInfo(topicId);
    setState({
      msgNumber: info.count,
      key: state.key,
    });
  };

  const onSwiping = (eventData: SwipeEventData) => {
    if (Math.abs(eventData.deltaX) < 35) setDeltaX(0);
    else setDeltaX(eventData.deltaX);
  };

  const onSwiped = (eventData: SwipeEventData) => {
    if (Math.abs(eventData.deltaX) > 150) {
      if (eventData.dir === "Left") {
        setState({
          msgNumber: state.msgNumber + 1,
          key: state.key + 1,
        });
      } else if (eventData.dir === "Right" && state.msgNumber > 0) {
        setState({
          msgNumber: state.msgNumber - 1,
          key: state.key + 1,
        });
      }
    }
    setDeltaX(0);
  };

  const swipeable = useSwipeable({
    onSwiping,
    onSwiped,
    delta: 15,
  });

  const onContentLoaded = useCallback(() => {
    setDispaly("block");
  }, []);

  let items = [state.msgNumber];

  if (deltaX < 0) items.push(state.msgNumber + 1);
  else if (deltaX > 0 && state.msgNumber > 0) items.push(state.msgNumber - 1);

  const style: React.CSSProperties = {
    transform: `translate3d(${deltaX}px, 0px, 0px)`,
    flexDirection: deltaX > 0 ? "row-reverse" : "row",
  };

  return (
    <div className="preview-container" style={{ display }}>
      <div className="topic-preview">
        <PreviewButtons
          topicId={topicId}
          onFirst={onClickFirst}
          onLast={onClickLast}
          onNext={onClickNext}
          onPrev={onClickPrev}
          close={close}
        />
        <div className="preview-carousel" {...swipeable} style={style}>
          <div
            className="preview-carousel-item"
            key={state.key}
            style={{ order: 0 }}
          >
            <PreviewContent
              topicId={topicId}
              n={items[0]}
              loggedUserId={loggedUserId}
              author={author}
              onDataLoaded={onContentLoaded}
            />
          </div>
          {items.length > 1 && (
            <div
              className="preview-carousel-item"
              key={state.key + 1}
              style={{ order: 1 }}
            >
              <PreviewContent
                topicId={topicId}
                n={items[1]}
                loggedUserId={loggedUserId}
                author={author}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopicPreview;
