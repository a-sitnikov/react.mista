import React, { FC, ReactElement } from 'react';
import { connect, ConnectedProps } from 'react-redux'
import { Button } from 'react-bootstrap'

import { getNewMessagesIfNeeded } from 'src/data/topic/actions'
import { getMaxPage } from 'src/utils'
import { RootState, useAppDispatch } from 'src/data/store'
import { defaultInfo } from 'src/data/topic';

const mapState = (state: RootState) => {

  const {
    isFetching,
    lastUpdated,
    info,
  } = state.topic || {
    isFetching: true,
    info: defaultInfo,
  }

  return {
    info,
    isFetching,
    lastUpdated
  }
}
const connector = connect(mapState);
type IProps = { page?: number | string};

const Footer: FC<ConnectedProps<typeof connector> & IProps> = ({ info, isFetching, page }): ReactElement => {

  const dispatch = useAppDispatch();

  const onBookmarkClick = () => {
    //dispatch(addBookmark(info));
  }

  const onRefreshClick = () => {
    dispatch(getNewMessagesIfNeeded());
  }

  const maxPage = getMaxPage(info.count);

  let updateButton;
  if (page === 'last20' || page === maxPage)
    updateButton =
      <Button
        onClick={onRefreshClick}
        disabled={false}
        size="sm"
        className='button'
        variant="light">
        {isFetching ? 'Обновляется' : 'Обновить ветку'}
      </Button>

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
        {updateButton}
      </div>
    </div>
  )
}

export default connector(Footer);