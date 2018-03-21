import React, { Component } from 'react'

import VoteChart from './vote_chart'

class MsgText extends Component {

    processLinksToAnswers(text) {

        const topicId = this.props.info.id;

        const regexp = /(\()(\d+)(\))/g; // (12)
        return text.replace(regexp, (res, ...segments) => {
            const number = segments[1]; 
            const page = Math.min(Math.ceil(number/100), 10);
            let pageParam = '';
            if (page > 1)
                pageParam = `&page=${page}`;

            return `(<a href='topic.php?id=${topicId}${pageParam}#${number}'>${number}</a>)`;
        });
    }

    processText(text) {

        text = this.processLinksToAnswers(text);
        return text;
    }

    render() {
        const { data, info } = this.props;
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
            let voteText = `${data.vote}. ${info.voting[data.vote - 1].select}`;
            voteElement =
                <div><br />
                    <b><span style={{ color: voteColors[data.vote] }}>{voteText}</span></b>
                </div>
        }

        let voteChart;
        if (data.n === "0" && info.is_voting === 1) {
            voteChart = <VoteChart items={info.voting} topicId={data.id} colors={voteColors} />
        }

        return (
            <td id={`tdmsg${data.n}`} className="leftbottomgray va-top " style={style}>
                {voteChart}
                <div id={data.n} className="message-text" dangerouslySetInnerHTML={{ __html: this.processText(data.text) }}>
                </div>
                {voteElement}
            </td>
        )
    }
}

export default MsgText;