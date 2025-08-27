import { Pagination } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";

import "./pages.css";
import { getPageNumber } from "src/utils";

type IProps = {
  maxPage: number;
  last20?: boolean;
};

const Pages: React.FC<IProps> = ({ maxPage, last20 }) => {
  const [searchParams] = useSearchParams();

  const currentPage = getPageNumber(searchParams.get("page"));

  let pages = [];
  const newSearchParams = new URLSearchParams(searchParams);
  for (let i = 1; i <= maxPage; i++) {
    if (i === 1) {
      newSearchParams.delete("page");
    } else {
      newSearchParams.set("page", String(i));
    }

    pages.push(
      <Pagination.Item
        active={currentPage === i}
        key={i}
        as={Link}
        to={"?" + newSearchParams.toString()}
      >
        {i}
      </Pagination.Item>
    );
  }

  if (last20 === true) {
    newSearchParams.set("page", "last20");
    pages.push(
      <Pagination.Item
        active={currentPage === "last20"}
        key="last20"
        as={Link}
        to={"?" + newSearchParams.toString()}
      >
        »
      </Pagination.Item>
    );
  }

  return <Pagination style={{ margin: "0px" }}>{pages}</Pagination>;
};

export default Pages;
