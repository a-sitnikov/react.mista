import React from 'react'

import UserInfo from './user_info'
import MsgText from './msg_text'

const Row = (props) => {

    const { columns, data, info } = props;

    let cells = [];
    let i = 0;
    for (let column of columns) {

        let value;
        if (column.name === 'Автор') {
            value = <UserInfo key={i} data={data} />

        } else if (column.name === 'Текст') {
            value = <MsgText key={i} data={data} info={info} />

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

export default Row;