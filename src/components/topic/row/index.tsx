import { FC, ReactElement } from 'react'
import { connect, ConnectedProps } from 'react-redux'

import UserInfo from './user_info'
import MsgText from './msg_text'
import { RootState } from 'src/store/store'
import { ITopicMessage } from 'src/store/topic'

type IProps = {
  data: ITopicMessage
}

const mapState = (state: RootState) => {

  const {
    info,
    item0,
  } = state.topic || {
    info: {},
    item0: {},
  }

  return {
    topicId: info.id,
    author: item0 ? item0.user : '',
    login: state.login
  }
}

const connector = connect(mapState);
const Row: FC<ConnectedProps<typeof connector> & IProps> = (props): ReactElement => {

    const { data, author, topicId, login } = props;

    if (!data)
      return null;

    return (
      <div className="topic-row" id={String(data.n)}>
        <div className="cell-userinfo">
          <UserInfo data={data} isAuthor={data.user === author} isYou={data.user === login.userName} />
        </div>
        <div className="cell-message">
          <MsgText data={data} html={data.text} topicId={topicId} n={data.n} vote={data.vote} />
        </div>
      </div>
    )
}

export default connector(Row);