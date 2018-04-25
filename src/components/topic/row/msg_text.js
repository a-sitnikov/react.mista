//@flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import activeHtml from 'react-active-html';

import Code from 'src/components/extensions/code1c'
import LinkToPost from 'src/components/extensions/link_to_post'

import VoteChart from './vote_chart'

import { defaultTopicState } from 'src/reducers/topic'
import { defaultOptionsState } from 'src/reducers/options'

import type { ResponseInfo, ResponseMessage } from 'src/api'
import type { DefaultProps } from 'src/components/index'
import type { State } from 'src/reducers'

type MsgTextProps = {
    topicId: string,
    data: ResponseMessage,
    style: {}
}

type StateProps = {
    info: ResponseInfo,
    voteColors: Array<string>
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
        const { topicId, data, info, style, voteColors } = this.props;

        let voteElement;
        if (data.vote && info.voting && topicId === info.id) {
            let voteOption = info.voting[data.vote - 1];
            if (voteOption)
                voteElement =
                    <div><br />
                        <b><span style={{ color: voteColors[data.vote] }}>{`${data.vote}. ${info.voting[data.vote - 1].select}`}</span></b>
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

    const { info } = state.topic || defaultTopicState;
    const { voteColors } = state.options || defaultOptionsState;
    
    return {
        info,
        voteColors
    }
}

export default connect(mapStateToProps)(MsgText);