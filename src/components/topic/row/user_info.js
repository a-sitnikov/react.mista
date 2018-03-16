import React from 'react'
import dateFormat from 'dateformat'

const UserInfo = (props) => {

    const { data } = props;
    const href = `users.php?id=${data.user}`;

    return (
        <td id={`tduser${data.n}`} className="bottomwhite ta-right va-top">
            <a data-user_id={data.id} data-user_name={data.user} className="registered-user" href={href}>{data.user}</a>
            <div className="message-info">
                <button className="sendbutton">{'' + data.n + ' - ' + dateFormat(new Date(data.utime * 1000), 'dd.mm.yy - HH:MM')}</button>
            </div>
        </td>
    )

}

export default UserInfo;