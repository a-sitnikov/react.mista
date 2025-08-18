import { FC, ReactElement } from "react";

import UserInfo from "./user_info";
import MsgText from "./msg_text";
import { useAppSelector } from "src/store";
import { ITopicMessage } from "src/store";
import { useTopicMessages } from "src/store/query-hooks";

type IProps = {
  item: ITopicMessage;
  topicId: number;
};

const Row: FC<IProps> = ({ item, topicId }): ReactElement => {
  const login = useAppSelector((state) => state.login);
  const { data: topic } = useTopicMessages({ topicId }, { enabled: false });
  const author = topic?.item0?.user || "";

  if (!item) return null;

  return (
    <div className="topic-row" id={String(item.n)}>
      <div className="cell-userinfo">
        <UserInfo
          data={item}
          isAuthor={item.user === author}
          isYou={item.user === login.userName}
        />
      </div>
      <div className="cell-message">
        <MsgText
          html={item.text}
          topicId={topicId}
          topicDate={item.time}
          n={item.n}
          vote={item.vote}
        />
      </div>
    </div>
  );
};

export default Row;
