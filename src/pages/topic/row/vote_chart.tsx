import { type IVotingItem } from "src/store";
import VoteItem from "./vote_item";

type IProps = {
  items: IVotingItem[];
  topicId: number;
  colors: string[];
};

const VoteChart: React.FC<IProps> = ({ items, topicId, colors }) => {
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
