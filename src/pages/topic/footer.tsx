import { Button } from "react-bootstrap";
import { useUpdateMessages } from "src/store/query-hooks";

type IProps = {
  topicId: number;
  isLastPage: boolean;
};

const Footer: React.FC<IProps> = ({ topicId, isLastPage }) => {
  const { isFetching, refetch } = useUpdateMessages(
    { topicId },
    { enabled: false }
  );

  const onBookmarkClick = () => {
    //dispatch(addBookmark(info));
  };

  return (
    <div className="flex w-full justify-between" id="F">
      <Button
        onClick={onBookmarkClick}
        disabled={false}
        size="sm"
        className="button"
        variant="light"
      >
        {"Закладка"}
      </Button>
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
  );
};

export default Footer;
