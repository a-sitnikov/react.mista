//@flow
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import dateFormat from 'dateformat'

import TopicNameCell from './topic_name_cell';
import LinkToPost from 'src/components/extensions/link_to_post'
import PreviewLink from './preview_link'

import { today } from 'src/utils'

import type { State } from 'src/reducers'
import type { TopicsListItem } from 'src/data/topicslist/reducer'
import type { LoginState } from 'src/data/login/reducer'
import type { DefaultProps } from 'src/components'

type RowProps = {
  columns: any,
  data: TopicsListItem
}

type StateProps = {
  login: LoginState,
  showTooltipOnTopicsList: string
}

type Props = RowProps & StateProps & DefaultProps;

const Row = (props: Props) => {

  const { data, showTooltipOnTopicsList } = props;
  let time = new Date(+data.utime * 1000);
  if (today(time)) {
    time = dateFormat(time, 'HH:MM')
  } else {
    time = dateFormat(time, 'dd.mm.yy');
  }
  return (
    <div className="topics-list-row">
      {/*{cells}*/}
      <div className="cell-forum">
        {data.forum}
      </div>
      <div className="cell-section">
        {data.sect1}
      </div>
      <div className="cell-answ">
        <i className="fa fa-comments-o" aria-hidden="true" style={{marginRight: "3px"}}></i>
        {showTooltipOnTopicsList === 'true' ?
          <LinkToPost topicId={data.id} number={data.answ} style={{ color: "inherit" }} isPreview />
          :
          data.answ
        }
      </div>
      <PreviewLink topicId={data.id} expanded={data.showPreview} />
      <TopicNameCell data={data} />
      <div className="cell-author">
        <i aria-hidden="true" className="fa fa-user-circle" style={{marginRight: "3px"}}></i>
        {data.user0}
      </div>
      <div className="cell-lastuser">
        <div style={{ display: "flex" }}>
          <span className="cell-lastuser-time">{time}</span>
          <span className="cell-lastuser-user">{data.user}</span>
        </div>
      </div>
      <div className="cell-last20">
        <Link to={`/topic.php?id=${String(data.id)}&page=last20#F`} style={{ color: "inherit", display: "block", width: "100%", textAlign: "center" }}>{'>'}</Link>
      </div>
    </div>
  )

}

const mapStateToProps = (state: State): StateProps => {

  return {
    login: state.login,
    showTooltipOnTopicsList: state.options.items.showTooltipOnTopicsList
  }
}

export default (connect(mapStateToProps)(Row): any );