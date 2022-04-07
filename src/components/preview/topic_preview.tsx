import React, { FC, ReactElement, useState, useEffect, useCallback } from 'react'
import { SwipeEventData, useSwipeable } from 'react-swipeable'
import { fetchTopicInfo } from 'src/api/topicinfo'

import { fetchTopicMessage } from 'src/api/topicMessages'

import MsgText from 'src/components/topic/row/msg_text'
import { ITopicMessage } from 'src/data/topic'
import UserInfo from '../topic/row/user_info'

import PreviewButtons from './preview_buttons'
import PreviewContent from './preview_content'
import './topic_preview.css'

type IProps = {
  topicId: number,
  initialMsgNumber: number,
  author: string,
  loggedUserId: number
}

const TopicPreview: FC<IProps> = ({ topicId, initialMsgNumber, author, loggedUserId }): ReactElement => {

  const [msgNumber, setMsgNumber] = useState(initialMsgNumber);
  const [deltaX, setDeltaX] = useState(0);

  const onClickFirst = () => {
    setMsgNumber(0);
  }

  const onClickNext = () => {
    setMsgNumber(msgNumber + 1);
  }

  const onClickPrev = () => {
    if (msgNumber > 0)
      setMsgNumber(msgNumber - 1);
  }

  const onClickLast = async () => {
    const info = await fetchTopicInfo(topicId);
    setMsgNumber(info.count)
  }

  const onSwiping = (eventData: SwipeEventData) => {
    console.log(eventData);
    setDeltaX(eventData.deltaX);
  }

  const onSwiped = (eventData: SwipeEventData) => {
    if (Math.abs(eventData.deltaX) > 150) {
      if (eventData.dir === "Left")
        setMsgNumber(msgNumber + 1);
      else if (eventData.dir === "Right" && msgNumber > 0)  
        setMsgNumber(msgNumber - 1);
    }  
    setDeltaX(0);
  }

  const swipeable = useSwipeable({
    onSwiping,
    onSwiped
  });

  let items = [];
  if (deltaX > 0 && msgNumber > 0)
    items.push({msgNumber: msgNumber - 1, order: 1});

  items.push({msgNumber, order: 0});
  if (deltaX < 0)
    items.push({msgNumber: msgNumber + 1, order: 1});

  const style: React.CSSProperties = {
    transform: `translate3d(${deltaX}px, 0px, 0px)`,
    flexDirection: deltaX > 0 ? 'row-reverse' : 'row'
  }

  return (
    <div className="preview-container">
      <div className="topic-preview">
        <PreviewButtons
          topicId={topicId}
          onFirst={onClickFirst}
          onLast={onClickLast}
          onNext={onClickNext}
          onPrev={onClickPrev}
        />
        <div className='preview-carousel' {...swipeable} style={style}>
          {items.map(item =>
            <div className='preview-carousel-item' key={item.msgNumber} style={{order: item.order}}>
              <PreviewContent
                topicId={topicId}
                n={item.msgNumber}
                loggedUserId={loggedUserId}
                author={author}
              />
            </div>)}
        </div>
      </div>
    </div>
  )

}

export default TopicPreview;