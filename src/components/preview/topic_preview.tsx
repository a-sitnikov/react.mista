//@flow
import React, { FC, ReactElement, useState, useEffect } from 'react'
import { fetchTopicInfo } from 'src/api/topicinfo'

import { fetchTopicMessage } from 'src/api/topicMessages'

import MsgText from 'src/components/topic/row/msg_text'
import { ITopicMessage } from 'src/data/topic'
import ErrorElem from '../common/error'

import PreviewHeader from './preview_header'
import './topic_preview.css'

type IProps = {
  topicId: number
}

type IState = {
  data?: ITopicMessage,
  error?: string  
}

const TopicPreview: FC<IProps> = ({ topicId }): ReactElement => {

  const [state, setState] = useState<IState>({
    data: null,
    error: null
  })

  const [ msgNumber, setMsgNumber ] = useState(0);

  useEffect(() => {
    fetchData(msgNumber);
  }, [msgNumber]) // eslint-disable-line react-hooks/exhaustive-deps

  const fetchData = async (n: number) => {
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
  }

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

  const { data, error } = state;
  if (!data && !error)
    return null;

  if (data)
    var { user, time } = data;

  return (
    <div className="topic-preview">
      <PreviewHeader
        user={user}
        time={time}
        topicId={topicId}
        n={msgNumber}
        onFirst={onClickFirst}
        onLast={onClickLast}
        onNext={onClickNext}
        onPrev={onClickPrev}
      />
      {data && <MsgText
        topicId={topicId}
        n={msgNumber}
        data={data}
        html={data.text}
        vote={data.vote}
        style={{ maxHeight: "500px", overflowY: "auto", overflowWrap: "break-word" }}
      />}
      {error && <ErrorElem text={error}/>}
    </div>
  )

}

export default TopicPreview;