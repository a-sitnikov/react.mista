//@flow
import React, { FC, ReactElement } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Link } from 'react-router-dom'
import dateFormat from 'dateformat'

import TopicNameCell from './topic_name_cell';
import LinkToPost from 'src/components/extensions/link_to_post'
import PreviewLink from './preview_link'

import { today } from 'src/utils'
import { RootState } from 'src/data/store';
import { ITopicsListItem } from 'src/data/topicslist';

const mapState = (state: RootState) => {

  return {
    login: state.login,
    showTooltipOnTopicsList: state.options.items.showTooltipOnTopicsList
  }
}
const connector = connect(mapState);

type IProps = {
  data: ITopicsListItem
}

const Row: FC<ConnectedProps<typeof connector> & IProps> = ({ data }): ReactElement => {

  let time = new Date(data.updated);
  let timeF: string;
  if (today(time)) {
    timeF = dateFormat(time, 'HH:MM')
  } else {
    timeF = dateFormat(time, 'dd.mm.yy');
  }
  return (
    <div className="topics-list-row">
      <div className="cell-forum">
        {data.forum}
      </div>
      <div className="cell-section">
        {data.section}
      </div>
      <div className="cell-answ">
        <i className="fa fa-comments-o" aria-hidden="true" style={{marginRight: "3px"}}></i>
        <LinkToPost topicId={data.id} number={data.count} style={{ color: "inherit" }} isPreview />
      </div>
      <PreviewLink topicId={data.id} expanded={data.showPreview} />
      <TopicNameCell data={data} />
      <div className="cell-author">
        <i aria-hidden="true" className="fa fa-user-circle" style={{marginRight: "3px"}}></i>
        {data.author}
      </div>
      <div className="cell-lastuser">
        <div style={{ display: "flex" }}>
          <span className="cell-lastuser-time">{timeF}</span>
          <span className="cell-lastuser-user">{data.lastUser}</span>
        </div>
      </div>
      <div className="cell-last20">
        <Link to={`/topic.php?id=${String(data.id)}&page=last20#F`} style={{ color: "inherit", display: "block", width: "100%", textAlign: "center" }}>{'>'}</Link>
      </div>
    </div>
  )

}

export default connector(Row);