import { ITooltipItem } from "src/store";
import { useMessageData } from "src/store/query-hooks";

import MsgText from "src/pages/topic/row/msg_text";
import UserInfo from "src/pages/topic/row/user_info";

import TooltipWindow from "./tooltip_window";
import TooltipHeader from "./tooltip_header";
import TooltipBody from "./tooltip_body";

import "./tooltip.css";

type IProps = {
  tooltip: ITooltipItem;
};

const Tooltip: React.FC<IProps> = ({ tooltip }) => {
  const { keys } = tooltip;

  const {
    data: item,
    isPending,
    isError,
    error,
  } = useMessageData({ topicId: keys.topicId, number: keys.number });

  if (isPending) return null;

  return (
    <TooltipWindow tooltip={tooltip}>
      <TooltipHeader>
        {isError ? (
          <b>Ошибка</b>
        ) : (
          <UserInfo
            data={item}
            isAuthor={false}
            isYou={false}
            isTooltip={true}
          />
        )}
      </TooltipHeader>
      <TooltipBody>
        <MsgText
          n={item?.n}
          vote={item?.vote}
          html={isError ? error.message : item.text}
          topicId={keys.topicId}
          topicDate={item?.time}
          style={{ maxHeight: "min(550px, 80vh)", overflowY: "auto" }}
        />
      </TooltipBody>
    </TooltipWindow>
  );
};

export default Tooltip;
