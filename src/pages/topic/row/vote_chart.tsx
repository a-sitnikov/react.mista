import { FC, ReactElement } from "react";
import VoteItem from "./vote_item";
import { IVotingItem } from "src/store";

type IProps = {
  items: IVotingItem[];
  topicId: number;
  colors: string[];
};

const VoteChart: FC<IProps> = ({ items, topicId, colors }): ReactElement => {
  let total = Math.max(...items.map((item) => item.count));

  return (
    <ul style={{ paddingLeft: 0 }}>
      {items
        .filter((item) => item.text)
        .map((data, i) => (
          <VoteItem
            key={i}
            data={data}
            total={total}
            n={i + 1}
            topicId={topicId}
            colors={colors}
          />
        ))}
    </ul>
  );
};

export default VoteChart;
