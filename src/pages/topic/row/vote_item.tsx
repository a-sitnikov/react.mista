import type CSS from "csstype";

import { domain } from "src/api";
import { type IVotingItem } from "src/store";

type IProps = {
  topicId: number;
  data: IVotingItem;
  colors: string[];
  total: number;
  n: number;
};

const VoteItem: React.FC<IProps> = ({ topicId, data, total, n, colors }) => {
  const img = `${domain}/css/voting${n}.png`;

  const percent = total ? Math.round((100 * data.count) / total) : 0;

  const imgStyle: CSS.Properties = {
    maxWidth: "500px",
    width: "100%",
    height: "15px",
  };

  return (
    <li className="voting-item">
      <div className="voting-title">
        <a
          rel="nofollow"
          style={{ textDecoration: "none" }}
          href={`#/topic.php?id=${topicId}&sel=${n}`}
        >
          <b>
            <span style={{ color: colors[n - 1] }}>{`${n}. ${data.text}`}</span>
          </b>
        </a>
      </div>
      <div className="voting-percentage">
        <b>
          <span
            style={{ color: colors[n - 1] }}
          >{`${percent}% (${data.count})`}</span>
        </b>
      </div>
      <div className="voting-bar">
        <div style={{ width: `${percent}%` }}>
          <a href={img}>
            <img src={img} style={imgStyle} alt={`вариант ${n}`} />
          </a>
        </div>
      </div>
    </li>
  );
};

export default VoteItem;
