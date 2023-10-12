import { FC, ReactElement } from "react";
import { Link } from "react-router-dom";

import { getMaxPage } from "src/utils";

type IProps = {
  count: number;
  topicId: number;
};

const Pages: FC<IProps> = ({ count, topicId }): ReactElement => {
  let pages = [];
  if (count > 100) {
    let maxPage = getMaxPage(count);
    for (let i = 1; i <= maxPage; i++) {
      let href = `/topic.php?id=${topicId}&page=${i}`;
      let text: string;
      if (i > 3 && i < maxPage) text = "•";
      else text = String(i);
      pages.push(
        <Link key={i} className="agh" style={{ margin: "3px" }} to={href}>
          {text}
        </Link>
      );
    }
  }

  if (count > 20) {
    let href = `/topic.php?id=${topicId}&page=last20#F`;
    pages.push(
      <Link key="last20" className="agh" style={{ margin: "3px" }} to={href}>
        »
      </Link>
    );
  }

  return <span className="topic-pages">{pages}</span>;
};

export default Pages;
