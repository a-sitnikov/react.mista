import { FC, ReactElement } from 'react';
import { connect, ConnectedProps } from 'react-redux'
import { Button } from 'react-bootstrap'

import { getMaxPage } from 'src/utils'
import { RootState, useAppDispatch } from 'src/store'
import { defaultInfo, getNewMessagesIfNeeded } from 'src/store'

const mapState = (state: RootState) => {

  const {
    status,
    lastUpdated,
    info,
  } = state.topic || {
    isFetching: true,
    info: defaultInfo,
  }

  return {
    info,
    status,
    lastUpdated
  }
}
const connector = connect(mapState);
type IProps = { page?: number | string };

const Footer: FC<ConnectedProps<typeof connector> & IProps> = ({ info, status, page }): ReactElement => {

  const dispatch = useAppDispatch();

  const onBookmarkClick = () => {
    //dispatch(addBookmark(info));
  }

  const onRefreshClick = () => {
    dispatch(getNewMessagesIfNeeded());
  }

  const maxPage = getMaxPage(info.count);

  let showUpdateButton = false;
  if (page === 'last20' || page === maxPage)
    showUpdateButton = true;

  return (
    <div className="flex-row" id="F">
      <div className="ta-left va-top" style={{ width: "50%" }}>
        <Button
          onClick={onBookmarkClick}
          disabled={false}
          size="sm"
          className='button'
          variant="light">
          {'Закладка'}
        </Button>
      </div>
      <div className="ta-right va-middle" style={{ marginLeft: "auto" }}>
        {showUpdateButton &&
          <Button
            onClick={onRefreshClick}
            disabled={status === "loading"}
            size="sm"
            className='button'
            variant="light">
            {status === "loading" ? 'Обновляется' : 'Обновить ветку'}
          </Button>
        }
      </div>
    </div>
  )
}

export default connector(Footer);