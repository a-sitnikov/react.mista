import { useState, useEffect } from "react";

import { Link, useSearchParams } from "react-router-dom";
import { fetchTopicInfo } from "src/api";
import {
  useActionCreators,
  type ITooltipKeys,
  tooltipsActions,
} from "src/store";
import { getMaxPage, childrenToText, toNumber, twMerge } from "src/utils";

type IProps = {
  topicId: number;
  number: number;
  className?: string;
} & React.PropsWithChildren;

const LinkToPost: React.FC<IProps> = ({
  topicId,
  number,
  children,
  className,
}) => {
  const actions = useActionCreators(tooltipsActions);

  const [searchParams] = useSearchParams();
  const currentTopicId = toNumber(searchParams.get("id"), -1);

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

    void run();

    return () => {
      isMounted = false;
    };
  }, [initialText, topicId]);

  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
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
        onClick={onClick}
        className={twMerge(className, "link")}
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
        <Link
          to={`/topic.php?id=${topicId}${pageParam}#${number}`}
          className={className}
        >
          {text}
        </Link>{" "}
        (
        <span onClick={onClick} className="link" role="button">
          {number}
        </span>
        )
      </span>
    );
  }
};

export default LinkToPost;
