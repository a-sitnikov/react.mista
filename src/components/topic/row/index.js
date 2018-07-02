//@flow
import React, { Component } from 'react'
import { connect } from 'react-redux'

import UserInfo from './user_info'
import MsgText from './msg_text'

import type { ResponseMessage } from 'src/api'
import type { State } from 'src/reducers'
import type { LoginState } from 'src/reducers/login'
import type { DefaultProps } from 'src/components'

type RowProps = {
    data: ResponseMessage
}

type StateProps = {
    topicId: string,
    author: string,
    login: LoginState
}

type Props = RowProps & StateProps & DefaultProps;

class Row extends Component<Props> {

    render() {
        const { data, author, topicId, login } = this.props;

        if (!data)
            return null;

        return (
            <div className="topic-row">
                <div className="cell-userinfo">
                    <UserInfo data={data} isAuthor={data.user === author} isYou={data.user === login.username}/>
                </div>
                <div className="cell-message">
                    <MsgText data={data} topicId={topicId}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: State): StateProps => {

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

export default connect(mapStateToProps)(Row);