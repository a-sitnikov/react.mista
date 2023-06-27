import { FC, ReactElement } from 'react'
import { domain } from 'src/api'

import { IVotingItem } from 'src/store'

type IProps = {
  topicId: number,
  data: IVotingItem,
  colors: string[],
  total: number,
  n: number
}

const VoteItem: FC<IProps> = ({ topicId, data, total, n, colors }): ReactElement => {

  const img = `${domain}/css/voting${n}.png`;

  let percent = 0;

  if (total) {
    percent = Math.round(100 * data.count / total);
  }

  const imgStyle = { maxWwidth: "500px", width: "100%", height: "15px" };

  return (
    <div className="voting-item">
      <div className="voting-title">
        <a rel="nofollow" style={{ textDecoration: "none" }} href={`#/topic.php?id=${topicId}&sel=${n}`}>
          <b><span style={{ color: colors[n - 1] }}>{`${n}. ${data.text}`}</span></b>
        </a>
      </div>
      <div className="voting-percentage">
        {/*<div className="div-va-middle">*/}
        <b><span style={{ color: colors[n - 1] }}>{`${percent}% (${data.count})`}</span></b>
        {/*</div>*/}
      </div>
      <div className="voting-bar">
        <div style={{ width: `${percent}%` }}>
          <a href={img}>
            <img src={img} style={imgStyle} alt={`п${n}`} />
          </a>
        </div>
      </div>
    </div>
  )
}

export default VoteItem;