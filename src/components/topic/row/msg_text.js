import React, { Component } from 'react'
import activeHtml from 'react-active-html';

import Code from '../../extensions/code1c'
import LinkToPost from '../../extensions/link_to_post'

import VoteChart from './vote_chart'

const componentsMap = {
    link: props => <LinkToPost topicId={props['data-topicid']} number={props['data-number']}  key={props.key}/>,
    code: props => <Code {...props} />
};

class MsgText extends Component {

    processLinksToPosts(text) {

        const topicId = this.props.info.id;

        const regexp = /(\()(\d+)(\))/g; // (12)
        return text.replace(regexp, (res, ...segments) => {
            const number = segments[1];
            return `(<link data-topicid='${topicId}' data-number='${number}' ></link>)`
        });
    }

    processCode1C(text) {

        const regexp = /(\[1C\])((.|\n)*?)(\[\/1C\])/g; // [1C] text [/1C]

        return text.replace(regexp, (res, ...segments) => {
            let text = segments[1];

            //remove first <br>
            if (text.substr(0, 4) === "<br>")
                text = text.substr(4);

            return `<code>${text}</code>`
        });
    }
    
    processText(text) {

        if (!text)
            return text;

        text = this.processLinksToPosts(text);
        text = this.processCode1C(text);
        return text;
    }

    render() {
        const { data, info } = this.props;

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

        let textComponent = activeHtml(this.processText(data.text), componentsMap);

        return (
            <div>
                {voteChart}
                <div>
                    {textComponent}
                </div>
                {voteElement}
            </div>
        )
    }
}

export default MsgText;