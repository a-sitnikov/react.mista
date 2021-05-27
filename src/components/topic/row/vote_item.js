//@flow
import React from 'react'
import { domain } from 'src/api'

import type { ResponseVoteItem } from 'src/api'

type Props = {
    topicId: string,
    data: ResponseVoteItem,
    colors: Array<string>,    
    total: number,
    n: number
}

const VoteItem = (props: Props) => {

    const { topicId, data, total, n, colors } = props;

    const img = `${domain}/css/voting${n}.png`;

    let percent = 0;

    if (total) {
        percent = Math.round(100 * data.result / total);
    }

    const imgStyle = { maxWwidth: "500px", width: "100%", height: "15px" };

    return (
        <div className="voting-item">
            <div className="voting-title">
                <a rel="nofollow" style={{ textDecoration: "none" }} href={`${window.hash}/topic.php?id=${topicId}&sel=${n}`}>
                    <b><span style={{ color: colors[n-1] }}>{`${n}. ${data.select}`}</span></b>
                </a>
            </div>
            <div className="voting-percentage">
                {/*<div className="div-va-middle">*/}
                    <b><span style={{ color: colors[n-1] }}>{`${percent}% (${data.result})`}</span></b>
                {/*</div>*/}
            </div>
            <div className="voting-bar">
                <div style={{width:`${percent}%`}}>
                    <a href={img}>
                        <img src={img} style={imgStyle} alt={`п${n}`} />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default ( VoteItem: any );