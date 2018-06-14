//@flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import dateFormat from 'dateformat'
import classNames from 'classnames'

import { addMessageText } from 'src/actions/new_message'

import type { ResponseMessage } from 'src/api'
import type { DefaultProps } from 'src/index'

type UserInfoProps = {
    data: ResponseMessage,
    isAuthor: boolean,
    isYou?: boolean
}

type Props = UserInfoProps & DefaultProps;

class UserInfo extends Component<Props> {

    onClick;

    constructor() {
        super();
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        const { dispatch, data } = this.props;
        dispatch(addMessageText(`(${data.n})`));
        
        let elem = document.getElementById('message_text'); 
        if (elem)
            window.scrollTo(0, elem.offsetTop);        
    }

    render() {
        const { data, isAuthor, isYou } = this.props;
        const href = `https://www.forum.mista.ru/users.php?id=${data.userId}`;
        let dataStr;
        if (!data) {
            dataStr = '';
        } else if (data.n === "0") {
            dataStr = dateFormat(new Date(+data.utime * 1000), 'dd.mm.yy - HH:MM');
        } else {
            dataStr = '' + data.n + ' - ' + dateFormat(new Date(+data.utime * 1000), 'dd.mm.yy - HH:MM');    
        }    

        const userClassNames = classNames("registered-user", {
            "is-author": isAuthor,
            "is-you": isYou
        });

        return (
            <div className="user-info">
                <a className={userClassNames} href={href}>{data.user}</a>
                <div className="message-time">
                    <span className="ah" >{dataStr}</span>
                    <button className="button ah" onClick={this.onClick}>{dataStr}</button>
                </div>
            </div>
        )
    }

}

export default connect()(UserInfo);