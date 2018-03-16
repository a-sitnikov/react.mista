import React from 'react'

import VoteChart from './vote_chart'

const MsgText = (props) => {

    const { data, info } = props;
    const style = { padding: "10px", backgroundColor: "#FDFDFD" };

    const voteColors = {
        1: "#FF1616",
        2: "#1A861A",
        3: "#0023FF",
        4: "#FF6B18",
        5: "#9B3A6E",
        6: "#567655",
        7: "#233345",
        8: "#CC0000",
        9: "#00CCCC",
        10: "#0000CC"
    };
    
    let voteElement;
    if (data.vote) {
        let voteText = `${data.vote}. ${info.voting[data.vote-1].select}`;
        voteElement =
            <div><br />
                <b><span style={{ color: voteColors[data.vote] }}>{voteText}</span></b>
            </div>
    }

    let voteChart;
    //&& info.is_voting === "1"
    if (data.n === "0") {
        voteChart = <VoteChart items={info.voting} topicId={data.id} colors={voteColors}/>
    }    

    return (
        <td id={`tdmsg${data.n}`} className="leftbottomgray va-top " style={style}>
            {voteChart}
            <div id={data.n} className="message-text" dangerouslySetInnerHTML={{ __html: data.text }}>
            </div>
            {voteElement}
        </td>
    )

}

export default MsgText;