import { ITopicsListItem } from "src/store";

type IProps = {
  item: ITopicsListItem;
};

const AuthorCell: React.FC<IProps> = ({ item }) => (
  <div className="cell-author">
    <div className="cell-author--inner">
      <i
        aria-hidden="true"
        className="fa fa-user-circle"
        style={{ marginRight: "3px" }}
      ></i>
      {item.author}
    </div>
  </div>
);

export default AuthorCell;
