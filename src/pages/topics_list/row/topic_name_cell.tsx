import classNames from "classnames";
import { Link } from "react-router-dom";

import { type ITopicsListItem, useAppSelector } from "src/store";
import Pages from "./pages";

type IProps = {
  data: ITopicsListItem;
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

const TopicNameCell: React.FC<IProps> = ({ data }) => {
  const loggedUserName = useAppSelector((state) => state.login.userName);

  let text = addPrefix(data.text, data.forum, data.sectionCode);

  return (
    <div className="cell-title">
      <div className="my-auto">
        {data.pinned && (
          <i
            className="fa fa-thumb-tack agh"
            aria-hidden="true"
            style={{ marginRight: "5px" }}
          ></i>
        )}
        <Link
          to={`/topic.php?id=${data.id}`}
          className={classNames("agb", "mr5", {
            bold: data.count >= 100,
            mytopics: data.author === loggedUserName,
            pinned: data.pinned,
          })}
          dangerouslySetInnerHTML={{ __html: text }}
          style={{ overflowWrap: "anywhere" }}
        ></Link>
        {data.isVoting && <span className="agh mx-1">[±]</span>}
        <Pages count={data.count} topicId={data.id} />
        {data.closed && <span className="agh">Ø</span>}
        {data.down && <span className="agh">↓</span>}
        {data.section && (
          <span className="topic-section">
            <span className="agh" style={{ margin: "0px 5px" }}>
              /
            </span>
            <Link
              key="1"
              rel="nofollow"
              className="agh"
              to={`/index.php?section=${data.sectionCode}`}
            >
              {data.section}
            </Link>
          </span>
        )}
      </div>
    </div>
  );
};

export default TopicNameCell;
