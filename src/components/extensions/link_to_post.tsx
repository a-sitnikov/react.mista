import { useRef, useState, useEffect } from "react";

import { getMaxPage, childrenToText, toNumber } from "src/utils";
import { fetchTopicInfo } from "src/api";
import { useActionCreators, useAppSelector } from "src/store";
import { ITooltipKeys, tooltipsActions } from "src/store";
import { useSearchParams } from "react-router-dom";

type IProps = {
  topicId: number;
  number: number;
  style?: {};
} & React.PropsWithChildren;

const LinkToPost: React.FC<IProps> = ({ topicId, number, children, style }) => {
  const timerRef = useRef(null);
  const actions = useActionCreators(tooltipsActions);

  const [searchParams] = useSearchParams();
  const currentTopicId = toNumber(searchParams.get("id"), -1);

  const tooltipDelay = useAppSelector(
    (state) => +state.options.items.tooltipDelay
  );

  let initialText = "";
  if (!children) initialText = String(number);
  else initialText = childrenToText(children).join("");

  const [text, setText] = useState(initialText);

  useEffect(() => {
    let isMounted = true;

    if (!initialText.startsWith("http")) {
      setText(initialText);
      return;
    }

    const run = async () => {
      const { title } = await fetchTopicInfo(topicId);
      if (isMounted) setText(title);
    };

    run();

    return () => {
      isMounted = false;
    };
  }, [initialText, topicId]);

  const onMouseOver = (e: React.MouseEvent<HTMLElement>) => {
    e.persist();
    timerRef.current = setTimeout(() => showToolTip(e), tooltipDelay);
  };

  const onMouseOut = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (timerRef.current) clearTimeout(timerRef.current);
    showToolTip(e);
  };

  const showToolTip = (e: React.MouseEvent<HTMLElement>) => {
    const coords = {
      x: e.pageX,
      y: e.pageY - 50, // remove navbar margin-top
    };

    const keys: ITooltipKeys = {
      topicId: +topicId,
      number: +number,
    };

    actions.show({ keys, coords });
  };

  if (topicId === currentTopicId || !isNaN(+text))
    return (
      <span
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        onClick={onClick}
        className="link"
        style={{ ...style }}
        role="button"
      >
        {text}
      </span>
    );
  else {
    const page = getMaxPage(number);

    let pageParam = "";
    if (page > 1) pageParam = `&page=${page}`;

    return (
      <span>
        <a
          href={`#/topic.php?id=${topicId}${pageParam}#${number}`}
          style={{ ...style }}
        >
          {text}
        </a>{" "}
        (
        <span
          onMouseOver={onMouseOver}
          onMouseOut={onMouseOut}
          onClick={onClick}
          className="link"
          role="button"
        >
          {number}
        </span>
        )
      </span>
    );
  }
};

export default LinkToPost;
