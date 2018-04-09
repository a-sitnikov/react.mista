import React, { Component } from 'react'
import { connect } from 'react-redux'

import UserInfo from './user_info'
import MsgText from './msg_text'

class Row extends Component {

    render() {
        const { columns, data, info, author } = this.props;

        if (!data)
            return null;

        let cells = [];
        let i = 0;
        for (let column of columns) {

            let value;
            if (column.name === 'Автор') {
                value = (
                    <td key={column.name} id={`tduser${data.n}`} className="bottomwhite ta-right va-top">
                        <UserInfo key={i} data={data} isAuthor={data.user === author}/>
                    </td>
                )

            } else if (column.name === 'Текст') {

                const style = { padding: "10px", backgroundColor: "#FDFDFD" }

                value = (
                    <td  key={column.name} id={`tdmsg${data.n}`} className="leftbottomgray va-top " style={style}>
                        <MsgText key={i} data={data} info={info} />
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

const mapStateToProps = state => {

    const {
        info,
        item0,
    } = state.topic || {
        info: {},
        item0: {},
    }

    return {
        info,
        author: item0 ? item0.user : ''
    }
}

export default connect(mapStateToProps)(Row);