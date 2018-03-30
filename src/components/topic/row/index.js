import React, { Component } from 'react'

import UserInfo from './user_info'
import MsgText from './msg_text'

class Row extends Component {

    render() {
        const { columns, data, info } = this.props;

        let cells = [];
        let i = 0;
        for (let column of columns) {

            let value;
            if (column.name === 'Автор') {
                value = (
                    <td key={column.name} id={`tduser${data.n}`} className="bottomwhite ta-right va-top">
                        <UserInfo key={i} data={data} />
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

export default Row;