import { ITopicsListItem } from "src/store";

type IProps = {
  item: ITopicsListItem;
};

const ForumCell: React.FC<IProps> = ({ item }) => (
  <div className="cell-forum">
    <div className="cell-forum--inner">{item.forum}</div>
  </div>
);

export default ForumCell;
