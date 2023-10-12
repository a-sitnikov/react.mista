import { FC, ReactElement } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

import Pages from "./pages";
import { useAppSelector } from "src/store";

type IProps = {
  id: number;
  count: number;
  author: string;
  pinned: boolean;
  forum: string;
  sectionCode: string;
  section: string;
  text: string;
  isVoting: boolean;
  closed: boolean;
  down: boolean;
};

const addPrefix = (
  text: string,
  forum: string,
  sectionCode: string
): string => {
  if (forum === "life" && !text.startsWith("OFF")) {
    return "OFF: " + text;
  } else if (sectionCode === "job" && !text.startsWith("JOB")) {
    return "JOB: " + text;
  } else if (sectionCode === "v7" && !text.startsWith("v7")) {
    return "v7: " + text;
  }
  return text;
};

const TopicNameCell: FC<IProps> = (props): ReactElement => {
  const loggedUserName = useAppSelector((state) => state.login.userName);

  let href = `/topic.php?id=${props.id}`;
  let classes = classNames("agb", "mr5", {
    bold: props.count >= 100,
    mytopics: props.author === loggedUserName,
    pinned: props.pinned,
  });

  let sectionHref = `/index.php?section=${props.sectionCode}`;
  let section: ReactElement;
  if (props.section) {
    section = (
      <span className="topic-section">
        <span className="agh" style={{ margin: "0px 5px" }}>
          /
        </span>
        <Link key="1" rel="nofollow" className="agh" to={sectionHref}>
          {props.section}
        </Link>
      </span>
    );
  }

  let text = addPrefix(props.text, props.forum, props.sectionCode);

  return (
    <div className="cell-title">
      <div className="cell-title--inner">
        {props.pinned && (
          <i
            className="fa fa-thumb-tack agh"
            aria-hidden="true"
            style={{ marginRight: "5px" }}
          ></i>
        )}
        <Link
          to={href}
          className={classes}
          dangerouslySetInnerHTML={{ __html: text }}
          style={{ overflowWrap: "anywhere" }}
        ></Link>
        {props.isVoting && <span className="agh separator">[±]</span>}
        <Pages count={props.count} topicId={props.id} />
        {props.closed && <span className="agh">Ø</span>}
        {props.down && <span className="agh">↓</span>}
        {section}
      </div>
    </div>
  );
};

export default TopicNameCell;
