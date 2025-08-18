import { Button } from "react-bootstrap";
import { useUpdateMessages } from "src/store/query-hooks";

interface IProps {
  topicId: number;
  isLastPage: boolean;
}

const Footer: React.FC<IProps> = ({ topicId, isLastPage }) => {
  const { isFetching, refetch } = useUpdateMessages(
    { topicId },
    { enabled: false }
  );

  const onBookmarkClick = () => {
    //dispatch(addBookmark(info));
  };

  return (
    <div className="flex-row" id="F">
      <div className="ta-left va-top" style={{ width: "50%" }}>
        <Button
          onClick={onBookmarkClick}
          disabled={false}
          size="sm"
          className="button"
          variant="light"
        >
          {"Закладка"}
        </Button>
      </div>
      <div className="ta-right va-middle" style={{ marginLeft: "auto" }}>
        {isLastPage && (
          <Button
            onClick={() => refetch()}
            disabled={isFetching}
            size="sm"
            className="button"
            variant="light"
          >
            {isFetching ? "Обновляется" : "Обновить ветку"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Footer;
