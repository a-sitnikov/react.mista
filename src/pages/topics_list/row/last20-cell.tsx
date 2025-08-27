import React from "react";
import { Link } from "react-router-dom";
import { type ITopicsListItem } from "src/store";

type IProps = {
  item: ITopicsListItem;
};

const Last20Cell: React.FC<IProps> = ({ item }) => (
  <div className="cell-last20">
    <Link
      to={`/topic.php?id=${item.id}&page=last20#F`}
      style={{
        color: "inherit",
        display: "block",
        width: "100%",
        textAlign: "center",
      }}
    >
      <i className="fa fa-angle-right" aria-hidden="true"></i>
    </Link>
  </div>
);

export default Last20Cell;
