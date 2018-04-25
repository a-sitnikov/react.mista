//@flow
import React, { Component } from 'react'
import { connect } from 'react-redux'

import UserInfo from './user_info'
import MsgText from './msg_text'

import type { ResponseMessage, ResponseLogin } from 'src/api'
import type { State } from 'src/reducers'
import type { DefaultProps } from 'src/components'

type RowProps = {
    columns: Array<any>,
    data: ResponseMessage
}

type StateProps = {
    topicId: string,
    author: string,
    login: ResponseLogin
}

type Props = RowProps & StateProps & DefaultProps;

class Row extends Component<Props> {

    render() {
        const { columns, data, author, topicId, login } = this.props;

        if (!data)
            return null;

        let cells = [];
        let i = 0;
        for (let column of columns) {

            let value;
            if (column.name === 'Автор') {
                value = (
                    <td key={column.name} id={`tduser${data.n}`} className="bottomwhite ta-right va-top">
                        <UserInfo key={i} data={data} isAuthor={data.user === author} isYou={data.user === login.username}/>
                    </td>
                )

            } else if (column.name === 'Текст') {

                const style = { padding: "10px", backgroundColor: "#FDFDFD" }

                value = (
                    <td  key={column.name} id={`tdmsg${data.n}`} className="leftbottomgray va-top " style={style}>
                        <MsgText key={i} data={data} topicId={topicId}/>
                    </td>
                )
            }

            cells.push(value);
            i++;

        }

        return (
            <tr id={`message_${data.n}`}>
                {cells}
            </tr>
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