//@flow
import * as React from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'

import { getNewMessagesIfNeeded } from 'src/data/topic/actions'
import { getMaxPage } from 'src/utils'
import { useAppDispatch } from 'src/data/store'

type FooterProps = {
  info: any,
  dispatch: any,
  bookmark: any,
  isFetching: boolean,
  params: any
}

const Footer = (props) => {

  const dispatch = useAppDispatch();

  const onBookmarkClick = () => {
    const { info } = props;
    //dispatch(addBookmark(info));
  }

  const onRefreshClick = () => {

    const { info } = props;

    dispatch(getNewMessagesIfNeeded({
      id: info.id,
      last: parseInt(info.count, 10)
    }));

  }

  const { info, bookmark, isFetching, params } = props;
  const maxPage = getMaxPage(info.count);

  let updateButton;
  let page = params.page || 1;
  if (page === 'last20' || page === maxPage)
    updateButton =
      <Button
        onClick={onRefreshClick}
        disabled={bookmark.isFetching}
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
          disabled={bookmark.isFetching}
          size="sm"
          className='button'
          variant="light">
          {bookmark.isFetching ? 'Подождите...' : 'Закладка'}
        </Button>
      </div>
      <div className="ta-right va-middle" style={{ marginLeft: "auto" }}>
        {updateButton}
      </div>
    </div>
  )
}


const mapStateToProps = state => {

  const {
    isFetching,
    lastUpdated,
    info,
  } = state.topic || {
    isFetching: true,
    info: {},
  }

  return {
    info,
    isFetching,
    lastUpdated,
    bookmark: state.bookmark || {}
  }
}

export default (connect(mapStateToProps)(Footer): any );