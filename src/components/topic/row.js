import React from 'react'
import { utimeToDate } from '../../utils'

const Row = (props) => {

    const { columns, data } = props;

    let cells = [];
    let i = 0;
    for (let column of columns) {

        let value;
        if (column.name === 'Автор') {
            const href = `users.php?id=${data.id}`;
            value =
                <td key={i} className="bottomwhite ta-right va-top">
                    <a data-user_id={data.id} data-user_name={data.user} className="registered-user" href={href}>{data.user}</a>
                    <div className="message-info">
                        <button className="sendbutton">{utimeToDate(data.utime)}</button>
                    </div>
                </td>
        } else if (column.name === 'Текст') {
            value =
                <td key={i} className="leftbottomgray va-top ">
                    <div className="message-text" dangerouslySetInnerHTML={{ __html: data.text}}>
                    </div>
                </td>
        }

        cells.push(value);
        i++;

    }

    return (
        <tr>
            {cells}
        </tr>
    )

}

export default Row;