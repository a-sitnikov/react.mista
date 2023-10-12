import { FC, ReactElement } from "react";
import { Button } from "react-bootstrap";

import { getMaxPage } from "src/utils";
import { useAppDispatch, useAppSelector } from "src/store";
import { defaultInfo, getNewMessagesIfNeeded } from "src/store";

type IProps = { page?: number | string };

const Footer: FC<IProps> = ({ page }): ReactElement => {
  const dispatch = useAppDispatch();
  const info = useAppSelector((state) => state.topic.info || defaultInfo);
  const status = useAppSelector((state) => state.topic.status);

  const onBookmarkClick = () => {
    //dispatch(addBookmark(info));
  };

  const onRefreshClick = () => {
    dispatch(getNewMessagesIfNeeded());
  };

  const maxPage = getMaxPage(info.count);

  let showUpdateButton = false;
  if (page === "last20" || page === maxPage) showUpdateButton = true;

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
        {showUpdateButton && (
          <Button
            onClick={onRefreshClick}
            disabled={status === "loading"}
            size="sm"
            className="button"
            variant="light"
          >
            {status === "loading" ? "Обновляется" : "Обновить ветку"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Footer;
