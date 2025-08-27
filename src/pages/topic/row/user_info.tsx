import classNames from "classnames";
import dayjs from "dayjs";
import { useMemo } from "react";

import { domain } from "src/api";
import {
  type ITopicMessage,
  useActionCreators,
  newMessageActions,
} from "src/store";

import UserIco from "./user_ico";

type IProps = {
  data: ITopicMessage;
  isAuthor: boolean;
  isYou: boolean;
  isTooltip?: boolean;
};

const UserInfo: React.FC<IProps> = ({ data, isAuthor, isYou, isTooltip }) => {
  const actions = useActionCreators(newMessageActions);

  const onClick = () => {
    actions.changeText(`(${data.n})`);

    let elem = document.getElementById("message_text");
    if (elem) window.scrollTo(0, elem.offsetTop);
  };

  let dataStr = useMemo(() => {
    if (!data) return;

    if (data.n === 0) {
      return dayjs(data.time).format("DD.MM.YY - HH:mm");
    } else {
      return (
        <>
          <span className="message-number">{data.n}</span>
          {" - " + dayjs(data.time).format("DD.MM.YY - HH:mm")}
        </>
      );
    }
  }, [data]);

  const userClassNames = classNames("registered-user", {
    "is-author": isAuthor,
    "is-you": isYou,
  });

  return (
    <div className="user-info">
      <UserIco data={data} />
      <a
        className={userClassNames}
        href={`${domain}/users.php?id=${data.userId}`}
      >
        {data.user}
      </a>
      {isTooltip ? (
        <div
          className="ah"
          style={{ display: "inline-block", marginLeft: "5px" }}
        >
          {dataStr}
        </div>
      ) : (
        <div className="message-time">
          <span className="ah">{dataStr}</span>
          <button className="button ah" onClick={onClick}>
            {dataStr}
          </button>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
