//@flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import activeHtml from 'react-active-html';

import Code from 'src/components/extensions/code1c'
import LinkToPost from 'src/components/extensions/link_to_post'

import VoteChart from './vote_chart'

import { defaultTopicState } from 'src/reducers/topic'

import type { ResponseInfo, ResponseMessage } from 'src/api'
import type { DefaultProps } from 'src/components/index'
import type { State } from 'src/reducers'

type MsgTextProps = {
    topicId: string,
    data: ResponseMessage,
    style: {}
}

type StateProps = {
    info: ResponseInfo
}

type Props = MsgTextProps & StateProps & DefaultProps;

const componentsMap = {
    link: props => <LinkToPost topicId={props['data-topicid']} number={props['data-number']}  key={props.key}/>,
    code: props => <Code {...props} />
};

class MsgText extends Component<Props> {

    processLinksToPosts(text: string): string {

        const { topicId } = this.props;

        const regexp = /(\()(\d+)(\))/g; // (12)
        return text.replace(regexp, (res, ...segments) => {
            const number = segments[1];
            return `(<link data-topicid='${topicId}' data-number='${number}' ></link>)`
        });
    }

    processCode1C(text: string): string {

        const regexp = /(\[1C\])((.|\n)*?)(\[\/1C\])/g; // [1C] text [/1C]

        return text.replace(regexp, (res, ...segments) => {
            let text = segments[1];

            //remove first <br>
            if (text.substr(0, 4) === "<br>")
                text = text.substr(4);

            return `<code>${text}</code>`
        });
    }
    
    processText(text: ?string): ?string {

        if (!text)
            return text;

        text = this.processLinksToPosts(text);
        text = this.processCode1C(text);
        return text;
    }

    render() {
        const { topicId, data, info, style } = this.props;

        const voteColors: {[number]: string} = {};
        voteColors[1] = "#FF1616";
        voteColors[2] = "#1A861A";
        voteColors[3] = "#0023FF";
        voteColors[4] = "#FF6B18";
        voteColors[5] = "#9B3A6E";
        voteColors[6] = "#567655";
        voteColors[7] = "#233345";
        voteColors[8] = "#CC0000";
        voteColors[9] = "#00CCCC";
        voteColors[10] = "#0000CC";

        let voteElement;
        if (data.vote && info.voting && topicId === info.id) {
            let voteText = `${data.vote}. ${info.voting[data.vote - 1].select}`;
            voteElement =
                <div><br />
                    <b><span style={{ color: voteColors[data.vote] }}>{voteText}</span></b>
                </div>
        }

        let voteChart;
        if (data.n === "0" && info.is_voting === 1 && info.voting) {
            voteChart = <VoteChart items={info.voting} topicId={data.id} colors={voteColors} />
        }

        let textComponent = activeHtml(this.processText(data.text), componentsMap);

        return (
            <div style={{...style}}>
                {voteChart}
                <div>
                    {textComponent}
                </div>
                {voteElement}
            </div>
        )
    }
}

const mapStateToProps = (state: State): StateProps => {

    const { 
        info
    } = state.topic || defaultTopicState;

    return {
        info
    }
}

export default connect(mapStateToProps)(MsgText);