//@flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

import type { ResponseTopicsListItem } from 'src/api'
import type { State } from 'src/reducers'

import type { LoginState } from 'src/data/login/reducer'
import type { DefaultProps } from 'src/components'
import type { TopicPreviewState } from 'src/data/topic_preview/reducer'

import Pages from './pages';

type TopicNameCellProps = {
  data: ResponseTopicsListItem,
  preview: ?number
};

type StateProps = {
  login: LoginState,
  topicPreview: TopicPreviewState
};

type Props = TopicNameCellProps & StateProps & DefaultProps;

const TopicNameCell = ({ data, login }) => {

  let href = `/topic.php?id=${data.id}`;
  let classes = classNames('agb', 'mr5', {
    'bold': data.count >= 100,
    'mytopics': data.author === login.username
  });

  let isVoting;
  if (data.isVoting) {
    isVoting = <span className="agh separator">[±]</span>
  }

  let sectionHref = `/index.php?section=${data.sectionCode}`;
  let section;

  if (data.section) {
    section = (
      <span className="topic-section">
        <span className="agh" style={{ margin: "0px 5px" }}>/</span>
        <Link key="1" rel="nofollow" className="agh" to={sectionHref} >{data.section}</Link>
      </span>
    )
  }

  let closed;
  let down;
  let text = data.text;
  if (data.closed)
    closed = <span className="agh">Ø</span>

  if (data.down)
    down = <span className="agh">↓</span>

  if (data.sectionCode === 'job' && text.substring(0, 3) !== 'JOB')
    text = 'JOB: ' + text;

  else if (data.forum === 'life' && text.substring(0, 3) !== 'OFF')
    text = 'OFF: ' + text;

  else if (data.sectionCode === 'v7' && text.substring(0, 2) !== 'v7')
    text = 'v7: ' + text;

  return (
    <div className="cell-title">
      <Link to={href} className={classes} dangerouslySetInnerHTML={{ __html: text }} style={{ overflowWrap: "anywhere" }}></Link>
      {isVoting}
      <Pages answ={data.count} topicId={data.id} />
      {closed}
      {down}
      {section}
    </div>
  )

}

const mapStateToProps = (state: State): StateProps => {

  return {
    login: state.login,
    topicPreview: state.topicPreview
  }
}

export default (connect(mapStateToProps)(TopicNameCell): any );