import { Pagination } from "react-bootstrap";
import { useLocation } from "react-router-dom";

import "./pages.css";

type IProps = {
  maxPage: number;
  last20?: boolean;
};

const Pages: React.FC<IProps> = ({ maxPage, last20 }) => {
  const location = useLocation();
  let pathName = location.pathname;
  if (pathName === "/") pathName = "/index.php";

  const locationParams = new URLSearchParams(location.search);

  let currentPage: number | string;
  const page = locationParams.get("page");
  if (!page) currentPage = 1;
  else if (page === "last20") currentPage = "last20";
  else currentPage = parseInt(page, 10) || 1;

  let pages = [];
  for (let i = 1; i <= maxPage; i++) {
    locationParams.set("page", String(i));
    let href = "#" + pathName + "?" + locationParams.toString();

    pages.push(
      <Pagination.Item active={currentPage === i} key={i} href={href}>
        {i}
      </Pagination.Item>
    );
  }

  if (last20 === true) {
    locationParams.set("page", "last20");
    let href = "#" + pathName + "?" + locationParams.toString();
    pages.push(
      <Pagination.Item
        active={currentPage === "last20"}
        key="last20"
        href={href}
      >
        »
      </Pagination.Item>
    );
  }

  return <Pagination style={{ margin: "0px" }}>{pages}</Pagination>;
};

export default Pages;
