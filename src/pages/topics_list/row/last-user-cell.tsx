import { useEffect, useState } from "react";
import { fetchTopicMessage } from "src/api";
import { type ITopicsListItem } from "src/store";
import { formattedTime } from "src/utils";

type IProps = {
  item: ITopicsListItem;
};

const LastUserCell: React.FC<IProps> = ({ item }) => {
  const [time, setTime] = useState(item.updated);

  useEffect(() => {
    if (!item.pinned) return;

    const updateTime = async () => {
      const msg = await fetchTopicMessage(item.id, item.count);
      setTime(msg.time);
    };

    void updateTime();
  }, [item.pinned, item.id, item.count]);

  useEffect(() => {
    setTime(item.updated);
  }, [item.updated]);

  return (
    <div className="cell-lastuser">
      <div className="cell-author--inner">
        <span className="cell-lastuser-time">{formattedTime(time)}</span>
        <span className="cell-lastuser-user">{item.lastUser}</span>
      </div>
    </div>
  );
};

export default LastUserCell;
