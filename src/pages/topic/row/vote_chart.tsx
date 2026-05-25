import { type IVotingItem } from "src/store";
import VoteItem from "./vote_item";

type IProps = {
  items: IVotingItem[];
  topicId: string;
  colors: string[];
};

const VoteChart: React.FC<IProps> = ({ items, topicId, colors }) => {
  const total = items.reduce((acc, item) => acc + item.count, 0);
  const max = items.reduce((acc, item) => Math.max(acc, item.count), 0);

  return (
    <ul className="pl-0!">
      {items
        .filter((item) => item.text)
        .map((data, i) => (
          <VoteItem
            key={i}
            data={data}
            total={total}
            max={max}
            n={i + 1}
            topicId={topicId}
            colors={colors}
          />
        ))}
    </ul>
  );
};

export default VoteChart;
