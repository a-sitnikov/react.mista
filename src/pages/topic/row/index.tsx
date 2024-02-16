import { FC, ReactElement } from "react";

import UserInfo from "./user_info";
import MsgText from "./msg_text";
import { useAppSelector } from "src/store";
import { ITopicMessage } from "src/store";

type IProps = {
  data: ITopicMessage;
};

const Row: FC<IProps> = ({ data }): ReactElement => {
  const topicId = useAppSelector((state) => state.topic.info.id);
  const login = useAppSelector((state) => state.login);
  const author = useAppSelector((state) => state.topic.item0?.user || "");

  if (!data) return null;

  return (
    <div className="topic-row" id={String(data.n)}>
      <div className="cell-userinfo">
        <UserInfo
          data={data}
          isAuthor={data.user === author}
          isYou={data.user === login.userName}
        />
      </div>
      <div className="cell-message">
        <MsgText
          html={data.text}
          topicId={topicId}
          topicDate={data.time}
          n={data.n}
          vote={data.vote}
        />
      </div>
    </div>
  );
};

export default Row;
