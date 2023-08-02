import { FC, ReactElement, useState, useEffect } from 'react'

import { fetchTopicMessage } from 'src/api'

import MsgText from 'src/pages/topic/row/msg_text'
import UserInfo from 'src/pages/topic/row/user_info'

import { ITopicMessage } from 'src/store'

import './topic_preview.css'

type IProps = {
  topicId: number,
  n: number,
  author: string,
  loggedUserId: number,
  onDataLoaded?: () => void
}

const PreviewContent: FC<IProps> = ({ topicId, n, author, loggedUserId, onDataLoaded }): ReactElement => {

  const [data, setData] = useState<ITopicMessage | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    const getData = async () => {
      try {
        const _data = await fetchTopicMessage(topicId, n);
        if (_data) {
          setData(_data);
          setError(null);
          if (onDataLoaded) onDataLoaded();
        } else {
          setData(null);
          setError(`Не найдено сообщение ${n}`);
        }  
      } catch (e) {
        setData(null);
        setError((e as Error).message);
      }

    }

    getData();

  }, [topicId, n, onDataLoaded])

  if (!data && !error)
    return null;

  return (
    <>
      {data &&
        <div className='preview-content'>
          <div className='topic-preview-userinfo'>
            <UserInfo data={data} isAuthor={data.user === author} isYou={data.userId === loggedUserId} isTooltip />
          </div>
          <MsgText
            topicId={topicId}
            n={n}
            html={data.text}
            vote={data.vote}
            style={{ overflowY: "auto", overflowWrap: "break-word" }}
          />
        </div>}
      {error && <span>{error}</span>}
    </>
  )
}

export default PreviewContent;