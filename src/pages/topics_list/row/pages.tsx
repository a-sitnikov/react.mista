import { Link } from "react-router-dom";

import { getMaxPage } from "src/utils";

type IProps = {
  count: number;
  topicId: number;
};

const Pages: React.FC<IProps> = ({ count, topicId }) => {
  let pages = [];
  if (count > 100) {
    let maxPage = getMaxPage(count);
    for (let i = 1; i <= maxPage; i++) {
      pages.push(
        <Link
          key={i}
          className="agh"
          style={{ margin: "3px" }}
          to={`/topic.php?id=${topicId}&page=${i}`}
        >
          {i > 3 && i < maxPage ? "•" : String(i)}
        </Link>
      );
    }
  }

  if (count > 20) {
    pages.push(
      <Link
        key="last20"
        className="agh"
        style={{ margin: "3px" }}
        to={`/topic.php?id=${topicId}&page=last20#F`}
      >
        »
      </Link>
    );
  }

  return <span className="topic-pages">{pages}</span>;
};

export default Pages;
