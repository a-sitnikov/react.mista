//@flow
import React, { FC, ReactElement, useState, useEffect, useCallback } from 'react'
import { fetchTopicInfo } from 'src/api/topicinfo'

import { fetchTopicMessage } from 'src/api/topicMessages'

import MsgText from 'src/components/topic/row/msg_text'
import { ITopicMessage } from 'src/data/topic'
import ErrorElem from '../common/error'
import UserInfo from '../topic/row/user_info'

import PreviewHeader from './preview_header'
import './topic_preview.css'

type IProps = {
  topicId: number,
  initialMsgNumber: number,
  author: string,
  you: number
}

type IState = {
  data?: ITopicMessage,
  error?: string
}

const TopicPreview: FC<IProps> = ({ topicId, initialMsgNumber, author, you }): ReactElement => {

  const [state, setState] = useState<IState>({
    data: null,
    error: null
  })

  const [msgNumber, setMsgNumber] = useState(initialMsgNumber);

  const fetchData = useCallback(async (n: number) => {
    let data, error;
    try {
      data = await fetchTopicMessage(topicId, n);
      if (!data)
        error = `Сообщение не найдено ${n}`;

    } catch (e) {
      error = e.message
    };

    setState({
      data,
      error
    })
  }, [topicId]);

  useEffect(() => {
    fetchData(msgNumber);
  }, [msgNumber, fetchData])

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

  let startX = 0;

  const onTouchStart = (e: React.TouchEvent<HTMLElement>) => {
    startX = e.nativeEvent.changedTouches[0].clientX;
  }

  const onTouchEnd = (e: React.TouchEvent<HTMLElement>) => {
    let endX = e.nativeEvent.changedTouches[0].clientX;
    if (Math.abs(endX - startX) > 100)
      if (endX < startX)
        onClickNext()
      else
        onClickPrev()
  }

  const { data, error } = state;
  if (!data && !error)
    return null;

  return (
    <div className="preview-container">
      <div className="topic-preview">
        <PreviewHeader
          onFirst={onClickFirst}
          onLast={onClickLast}
          onNext={onClickNext}
          onPrev={onClickPrev}
        />
        <div onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          {data &&
            <>
              <div className='topic-preview-userinfo'>
                <UserInfo data={data} isAuthor={data.user === author} isYou={data.userId === you} isTooltip />
              </div>
              <MsgText
                topicId={topicId}
                n={msgNumber}
                data={data}
                html={data.text}
                vote={data.vote}
                style={{ overflowY: "auto", overflowWrap: "break-word" }}
              />
            </>}
          {error && <span>{error}</span>}
        </div>
      </div>
    </div>
  )

}

export default TopicPreview;