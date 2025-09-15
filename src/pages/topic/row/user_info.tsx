import dayjs from "dayjs";
import { useMemo } from "react";

import { domain } from "src/api";
import {
  type ITopicMessage,
  useActionCreators,
  newMessageActions,
} from "src/store";

import { twMerge } from "src/utils";
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

  return (
    <div className="user-info">
      <UserIco data={data} />
      <a
        className={twMerge(
          "registered-user",
          isAuthor && "is-author px-1 rounded-xs",
          isYou && "is-you px-1 rounded-xs"
        )}
        href={`${domain}/user/${data.userId}`}
      >
        {data.user}
      </a>
      {isTooltip ? (
        <span className="text-sm ml-2">{dataStr}</span>
      ) : (
        <div className="message-time">
          <span className="ah">{dataStr}</span>
          <button className="button ah px-1" onClick={onClick}>
            {dataStr}
          </button>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
