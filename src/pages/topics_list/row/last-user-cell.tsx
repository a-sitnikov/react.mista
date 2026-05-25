import { type ITopicsListItem } from "src/store";

type IProps = {
  item: ITopicsListItem;
};

const LastUserCell: React.FC<IProps> = ({ item }) => {
  return (
    <div className="cell-lastuser">
      <div className="cell-author--inner">
        <span className="cell-lastuser-user">{item.updated}</span>
      </div>
    </div>
  );
};

export default LastUserCell;
