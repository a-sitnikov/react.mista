//@flow
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import dateFormat from 'dateformat'
import classNames from 'classnames'
import { domain } from 'src/api'

import { addMessageText } from 'src/actions/new_message'

import type { ResponseMessage } from 'src/api'
import type { DefaultProps } from 'src/components'

type UserInfoProps = {
  data: ResponseMessage,
  isAuthor: boolean,
  isYou?: boolean,
  isTooltip?: boolean
}

type Props = UserInfoProps & DefaultProps;

class UserInfo extends Component<Props> {

  onClick = () => {
    const { dispatch, data } = this.props;
    dispatch(addMessageText(`(${data.n})`));

    let elem = document.getElementById('message_text');
    if (elem)
      window.scrollTo(0, elem.offsetTop);
  }

  onImageLoad = (event) => {
    event.target.style.display = 'inline';
  }

  render() {
    const { data, isAuthor, isYou, isTooltip } = this.props;
    const href = `${domain}/users.php?id=${data.userId}`;
    let dataStr;
    if (!data) {
      dataStr = '';
    } else if (data.n === "0") {
      dataStr = dateFormat(new Date(+data.utime * 1000), 'dd.mm.yy - HH:MM');
    } else {
      dataStr = (
        <Fragment>
          <span className="message-number">{data.n}</span>{' - ' + dateFormat(new Date(+data.utime * 1000), 'dd.mm.yy - HH:MM')}
        </Fragment>
      )
    }

    const userClassNames = classNames("registered-user", {
      "is-author": isAuthor,
      "is-you": isYou
    });

    let imgElem;
    if (window.innerWidth > 768)
    imgElem = <img src={`${domain}/css/user_icons/${data.userId}_16x16.png`} 
              onLoad={this.onImageLoad} 
              style={{display:"none", marginBottom:"4px", marginRight:"1px"}}/>

    let timeElem;  
    if (isTooltip) {
      timeElem = <div className="ah" style={{display:"inline-block", marginLeft:"5px"}}>{dataStr}</div>;
    } else {
      timeElem =
        <div className="message-time">
          <span className="ah" >{dataStr}</span>
          <button className="button ah" onClick={this.onClick}>{dataStr}</button>
        </div>
    }  

    return (
      <div className="user-info">
        {imgElem}
        <a className={userClassNames} href={href}>{data.user}</a>
        {timeElem}
      </div>
    )
  }

}

export default (connect()(UserInfo): any );