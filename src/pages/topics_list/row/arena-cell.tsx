import { type ITopicsListItem } from "src/store";

type IProps = {
  item: ITopicsListItem;
};

const ArenaCell: React.FC<IProps> = ({ item }) => (
  <div className="cell-forum">
    <div className="cell-forum--inner">{item.arena}</div>
  </div>
);

export default ArenaCell;
