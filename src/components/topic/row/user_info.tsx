//@flow
import React, { FC, ReactElement } from 'react'
import dateFormat from 'dateformat'
import classNames from 'classnames'
import { domain } from 'src/api'

import { addMessageText } from 'src/data/newmessage/actions'
import { useAppDispatch } from 'src/data/store'
import { ITopicMessage } from 'src/data/topic'

type IProps ={
  data: ITopicMessage,
  isAuthor: boolean,
  isYou: boolean,
  isTooltip?: boolean
}

const UserInfo: FC<IProps> = (props): ReactElement => {

  const dispatch = useAppDispatch();

  const onClick = () => {
    const { data } = props;
    dispatch(addMessageText(`(${data.n})`));

    let elem = document.getElementById('message_text');
    if (elem)
      window.scrollTo(0, elem.offsetTop);
  }

  const onImageLoad = (event) => {
    event.target.style.display = 'inline';
  }

    const { data, isAuthor, isYou, isTooltip } = props;
    const href = `${domain}/users.php?id=${data.userId}`;
    let dataStr;
    if (!data) {
      dataStr = '';
    } else if (data.n === 0) {
      dataStr = dateFormat(new Date(data.time), 'dd.mm.yy - HH:MM');
    } else {
      dataStr = (
        <>
          <span className="message-number">{data.n}</span>{' - ' + dateFormat(new Date(data.time), 'dd.mm.yy - HH:MM')}
        </>
      )
    }

    const userClassNames = classNames("registered-user", {
      "is-author": isAuthor,
      "is-you": isYou
    });

    let imgElem;
    if (window.innerWidth > 768)
    imgElem = <img src={`${domain}/css/user_icons/${data.userId}_16x16.png`} 
              alt="user ico"
              onLoad={onImageLoad} 
              style={{display:"none", marginBottom:"4px", marginRight:"1px"}}/>

    let timeElem;  
    if (isTooltip) {
      timeElem = <div className="ah" style={{display:"inline-block", marginLeft:"5px"}}>{dataStr}</div>;
    } else {
      timeElem =
        <div className="message-time">
          <span className="ah" >{dataStr}</span>
          <button className="button ah" onClick={onClick}>{dataStr}</button>
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

export default UserInfo;