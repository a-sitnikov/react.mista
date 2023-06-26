import { FC, ReactElement, useEffect, useState } from 'react'
import moment from 'moment'
import classNames from 'classnames'
import { domain } from 'src/api'

import { addMessageText } from 'src/data/newmessage/actions'
import { useAppDispatch } from 'src/store'
import { ITopicMessage } from 'src/store'

type IProps = {
  data: ITopicMessage,
  isAuthor: boolean,
  isYou: boolean,
  isTooltip?: boolean
}

const UserInfo: FC<IProps> = (props): ReactElement => {

  const dispatch = useAppDispatch();

  const [imgDisplay, setImgDisplay] = useState('none');

  const onClick = () => {
    const { data } = props;
    dispatch(addMessageText(`(${data.n})`));

    let elem = document.getElementById('message_text');
    if (elem)
      window.scrollTo(0, elem.offsetTop);
  }

  const onImageLoad = () => {
    setImgDisplay('inline');
  }

  const onImageError = () => {
    setImgDisplay('none');
  }

  const { data, isAuthor, isYou, isTooltip } = props;
  useEffect(() => {
    setImgDisplay('none');
  }, [data.n]);

  const href = `${domain}/users.php?id=${data.userId}`;
  let dataStr: ReactElement | string;
  if (!data) {
    dataStr = '';
  } else if (data.n === 0) {
    dataStr = moment(data.time).format('DD.MM.YY - HH:MM');
  } else {
    dataStr = (
      <>
        <span className="message-number">{data.n}</span>{' - ' + moment(data.time).format('DD.MM.YY - HH:MM')}
      </>
    )
  }

  const userClassNames = classNames("registered-user", {
    "is-author": isAuthor,
    "is-you": isYou
  });

  let imgElem: ReactElement;
  if (window.innerWidth > 768)
    imgElem = <img src={`${domain}/css/user_icons/${data.userId}_16x16.png`}
      alt="user ico"
      onLoad={onImageLoad}
      onError={onImageError}
      style={{ display: imgDisplay, marginBottom: "4px", marginRight: "1px" }} />

  let timeElem: ReactElement;
  if (isTooltip) {
    timeElem = <div className="ah" style={{ display: "inline-block", marginLeft: "5px" }}>{dataStr}</div>;
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