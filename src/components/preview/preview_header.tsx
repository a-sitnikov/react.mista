//@flow
import React, { FC, ReactElement } from 'react'
import { Link } from 'react-router-dom'
import dateFormat from 'dateformat'

import './topic_preview.css'

type IProps = {
  user?: string,
  time?: number,
  topicId: number,
  n: number,
  onFirst: any,
  onLast: any,
  onPrev: any,
  onNext: any
}

const PreviewHeader: FC<IProps> = ({user, time, topicId, n,
  onFirst, onPrev, onNext, onLast}): ReactElement => {

  if (time)
    var date = new Date(time);

  return (
  <div>
    <span className="plus-nav" onClick={onFirst}>[← </span>
    <span className="plus-nav" onClick={onPrev}> « </span>
    <Link className="plus-nav" title={`Перейти к сообщению ${n}`} to={`/topic.php?id=${topicId}#${n}`}>{n}</Link>
    <span className="plus-nav" onClick={onNext}> » </span>
    <span className="plus-nav" onClick={onLast}> →]</span>
    <b style={{ margin: "auto 5px" }}>{user}</b>
    <span className="agh">{dateFormat(date, 'dd.mm.yy - HH:MM')}</span>
  </div>
  )    

}

export default PreviewHeader;