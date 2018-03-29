import React, { Component } from 'react'
import activeHtml from 'react-active-html';

import Code from './code1c'
import VoteChart from './vote_chart'
import { maxPage } from '../../../utils';

const componentsMap = {
    link: props => <LinkToPost {...props} />,
    code: props => <Code {...props} />
};

class LinkToPost extends Component {

    render() {

        const topicId = this.props['data-topicid'];
        const number = this.props['data-number'];
        
        const page = maxPage(number);
      
        let pageParam = '';
        if (page> 1)
            pageParam = `&page=${page}`;

        return (
            <a href={`topic.php?id=${topicId}${pageParam}#${number}`}>{number}</a>
        )
    }
}

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

        text = this.processLinksToPosts(text);
        text = this.processCode1C(text);
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

        let textComponent = activeHtml(this.processText(data.text), componentsMap);

        return (
            <td id={`tdmsg${data.n}`} className="leftbottomgray va-top " style={style}>
                {voteChart}
                <div>
                    {textComponent}
                </div>
                {voteElement}
            </td>
        )
    }
}

export default MsgText;