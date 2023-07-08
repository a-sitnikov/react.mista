import { FC, ReactElement, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import TopicNameCell from './topic_name_cell';
import PreviewLink from './preview_link'

import { formattedTime } from 'src/utils'
import { useActionCreators } from 'src/store';
import { ITopicsListItem, topicsListActions } from 'src/store';
import { fetchTopicMessage } from 'src/api';

interface IProps extends ITopicsListItem {
  updated: number,
  topicId: number
}

const Row: FC<IProps> = ({ topicId, updated, ...data }): ReactElement => {

  const actions = useActionCreators(topicsListActions);

  const [time, setTime] = useState(updated);

  useEffect(() => {

    if (!data.pinned) return;

    const updateTime = async () => {
      const msg = await fetchTopicMessage(topicId, data.count);
      setTime(msg.time);
    }

    updateTime();

  }, [data.pinned, topicId, data.count])

  useEffect(() => {
    setTime(updated);
  }, [updated])

  const countOnClick = () => {
    actions.togglePreview({ topicId, msgNumber: data.count });
  }

  return (
    <div className="topics-list-row">
      <div className="cell-forum">
        {data.forum}
      </div>
      <div className="cell-section">
        {data.section}
      </div>
      <div className="cell-answ" onClick={countOnClick}>
        <i className="fa fa-comments-o" aria-hidden="true" style={{ marginRight: "3px" }}></i>
        <span>{data.count}</span>
      </div>
      <PreviewLink topicId={data.id} expanded={data.showPreview} />
      <TopicNameCell {...data} />
      <div className="cell-author">
        <i aria-hidden="true" className="fa fa-user-circle" style={{ marginRight: "3px" }}></i>
        {data.author}
      </div>
      <div className="cell-lastuser">
        <div style={{ display: "flex" }}>
          <span className="cell-lastuser-time">{formattedTime(time)}</span>
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

export default Row;