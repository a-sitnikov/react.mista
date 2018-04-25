//@flow
import React from 'react'
import dateFormat from 'dateformat'

import type { ResponseMessage } from 'src/api'

type Props = {
    data: ResponseMessage,
    isAuthor: boolean,
    isYou?: boolean
}

const UserInfo = (props: Props) => {

    const { data, isAuthor, isYou } = props;
    const href = `https://www.forum.mista.ru/users.php?name=${data.user}`;
    let dataStr;
    if (!data) {
        dataStr = '';
    } else if (data.n === "0") {
        dataStr = dateFormat(new Date(+data.utime * 1000), 'dd.mm.yy - HH:MM');
    } else {
        dataStr = '' + data.n + ' - ' + dateFormat(new Date(+data.utime * 1000), 'dd.mm.yy - HH:MM');    
    }    

    let style = {};
    if (isAuthor)
        style.backgroundColor = 'rgb(255, 215, 132)';
    else if (isYou)
        style.backgroundColor = 'rgb(155, 197, 239)';

    return (
        <div>
            <a data-user_id={data.id} data-user_name={data.user} className="registered-user" style={style} href={href}>{data.user}</a>
            <div className="message-info">
                <button className="button">{dataStr}</button>
            </div>
        </div>
    )

}

export default UserInfo;