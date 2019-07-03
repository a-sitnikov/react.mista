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
    let width = 0;

    if (total) {
        percent = Math.round(100 * data.result / total);
        width = 400 * percent / 100;
    }

    const imgStyle = { maxWwidth: "500px", width: `${width}px`, height: "15px" };

    return (
        <div className="flex-row" style={{ marginBottom: "3px" }}>
            <div style={{ flex: "1 1 200px", maxWidth: "400px", marginRight: "5px" }}>
                <a rel="nofollow" style={{ textDecoration: "none" }} href={`${window.hash}/topic.php?id=${topicId}&sel=${n}`}>
                    <b><span style={{ color: colors[n-1] }}>{`${n}. ${data.select}`}</span></b>
                </a>
            </div>
            <div style={{ flex: "0 0 100px", position: "relative" }} className="ta-left va-middle">
                <div className="div-va-middle">
                    <b><span style={{ color: colors[n-1] }}>{`${percent}% (${data.result})`}</span></b>
                </div>
            </div>
            <div style={{ flex: "1 1 400px", position: "relative" }}>
                <div className="div-va-middle">
                    <a href={img}>
                        <img src={img} style={imgStyle} alt={`п${n}`} />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default VoteItem;