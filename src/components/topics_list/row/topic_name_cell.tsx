import React, { FC, ReactElement } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

import Pages from './pages';
import { ITopicsListItem } from 'src/data/topicslist';
import { RootState } from 'src/data/store';

type IProps = {
  data: ITopicsListItem,
  preview?: number
};


const mapState = (state: RootState) => {

  return {
    login: state.login,
    topicPreview: state.topicPreview
  }
}

const connector = connect(mapState);

const TopicNameCell: FC<ConnectedProps<typeof connector> & IProps> = ({ data, login }) => {

  let href = `/topic.php?id=${data.id}`;
  let classes = classNames('agb', 'mr5', {
    'bold': data.count >= 100,
    'mytopics': data.author === login.userName
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
      <Pages count={data.count} topicId={data.id} />
      {closed}
      {down}
      {section}
    </div>
  )

}

export default connector(TopicNameCell);