//@flow
import React, { FC, ReactElement, useState, useEffect } from 'react'
import { fetchTopicInfo } from 'src/api/topicinfo'

import { fetchTopicMessage } from 'src/api/topicMessages'

import MsgText from 'src/components/topic/row/msg_text'
import { ITopicMessage } from 'src/data/topic'

import PreviewHeader from './preview_header'
import './topic_preview.css'

type IProps = {
  topicId: number
}

type IState = {
  n: number,
  data?: ITopicMessage,
  error?: string  
}

const TopicPreview: FC<IProps> = ({ topicId }): ReactElement => {

  const [state, setState] = useState<IState>({
    n: 0,
    data: null,
    error: null
  })

  useEffect(() => {
    fetchData(state.n);
  }, [state.n])

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
      n,
      data,
      error
    })
  }

  const onClickFirst = () => {
    fetchData(0);
  }

  const onClickNext = () => {
    fetchData(state.n + 1);
  }

  const onClickPrev = () => {
    if (state.n > 0)
      fetchData(state.n - 1);
  }

  const onClickLast = async () => {
    const info = await fetchTopicInfo(topicId);
    fetchData(info.count);
  }

  const { data, error, n } = state;
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
        n={n}
        onFirst={onClickFirst}
        onLast={onClickLast}
        onNext={onClickNext}
        onPrev={onClickPrev}
      />
      {data && <MsgText
        topicId={topicId}
        n={state.n}
        data={data}
        html={data.text}
        vote={data.vote}
        style={{ maxHeight: "500px", overflowY: "auto", overflowWrap: "break-word" }}
      />}
      {error && <p>{error}</p>}
    </div>
  )

}

export default TopicPreview;