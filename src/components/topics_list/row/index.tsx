import { FC, ReactElement, useCallback, useEffect, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Link } from 'react-router-dom'
import dateFormat from 'dateformat'

import TopicNameCell from './topic_name_cell';
import PreviewLink from './preview_link'

import { today } from 'src/utils'
import { RootState, useAppDispatch } from 'src/data/store';
import { ITopicsListItem } from 'src/data/topicslist';
import { fetchTopicMessage } from 'src/api/topicMessages';
import  topicListSlice  from 'src/data/topicslist/reducer';

const mapState = (state: RootState) => {

  return {
    login: state.login
  }
}
const connector = connect(mapState);

type IProps = {
  data: ITopicsListItem,
  updated: number,
  topicId: number
}

const formatTime = (time: number): string => {
  
  if (time === 2147483648000) return '';
  
  let date = new Date(time);
  if (today(date)) {
    return dateFormat(time, 'HH:MM')
  } else {
    return dateFormat(time, 'dd.mm.yy');
  }  
}

const Row: FC<ConnectedProps<typeof connector> & IProps> = ({ data, updated, topicId }): ReactElement => {

  const dispatch = useAppDispatch();

  const [time, setTime] = useState(updated);
  const updateTime = useCallback(async () => {
    const msg = await fetchTopicMessage(topicId, data.count);
    setTime(msg.time);
  }, [topicId, data.count])
  
  useEffect(() => {
    if (data.pinned)
      updateTime();
  }, [data.pinned, updateTime])
  
  useEffect(() => {
    setTime(updated);
  }, [updated])

  const countOnClick = useCallback(() => {
    dispatch(topicListSlice.actions.togglePreview({topicId, msgNumber: data.count}));
  }, [dispatch, topicId, data.count]);
  
  return (
    <div className="topics-list-row">
      <div className="cell-forum">
        {data.forum}
      </div>
      <div className="cell-section">
        {data.section}
      </div>
      <div className="cell-answ" onClick={countOnClick}>
        <i className="fa fa-comments-o" aria-hidden="true" style={{marginRight: "3px"}}></i>
        <span>{data.count}</span>
      </div>
      <PreviewLink topicId={data.id} expanded={data.showPreview} />
      <TopicNameCell data={data}/>
      <div className="cell-author">
        <i aria-hidden="true" className="fa fa-user-circle" style={{marginRight: "3px"}}></i>
        {data.author}
      </div>
      <div className="cell-lastuser">
        <div style={{ display: "flex" }}>
          <span className="cell-lastuser-time">{formatTime(time)}</span>
          <span className="cell-lastuser-user">{data.lastUser}</span>
        </div>
      </div>
      <div className="cell-last20">
        <Link to={`/topic.php?id=${data.id}&page=last20#F`} style={{ color: "inherit", display: "block", width: "100%", textAlign: "center" }}>
          <i className="fa fa-angle-right" aria-hidden="true"></i>
        </Link>
      </div>
    </div>
  )

}

export default connector(Row);