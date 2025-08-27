import { useAppSelector, type ITopicMessage } from "src/store";

import { useTopicMessages } from "src/store/query-hooks";
import MsgText from "./msg_text";
import UserInfo from "./user_info";

type IProps = {
  item: ITopicMessage;
  topicId: number;
};

const Row: React.FC<IProps> = ({ item, topicId }) => {
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
