import React from "react";
import { type ITopicsListItem } from "src/store";

type IProps = {
  item: ITopicsListItem;
} & React.HTMLAttributes<HTMLDivElement>;

const CountCell: React.FC<IProps> = ({ item, onClick }) => (
  <div className="cell-answ" onClick={onClick}>
    <div className="cell-answ--inner">
      <i className="fa fa-comments-o mr-[3px]" aria-hidden="true"></i>
      <span>{item.count}</span>
    </div>
  </div>
);

export default CountCell;
