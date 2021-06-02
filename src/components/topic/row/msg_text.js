//@flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import activeHtml from 'react-active-html';

import Code from 'src/components/extensions/code1c'
import LinkToPost from 'src/components/extensions/link_to_post'
import CustomLink from 'src/components/extensions/custom_link'

import VoteChart from './vote_chart'
import Vote from './vote'

import type { ResponseInfo, ResponseMessage } from 'src/api'
import type { DefaultProps } from 'src/components'
import type { State } from 'src/reducers'

type MsgTextProps = {
  topicId: string,
  n: string,
  html: string,
  vote: number,
  data: ResponseMessage,
  style: {}
}

type StateProps = {
  info: ResponseInfo,
  showTooltips: string,
  voteColors: Array<string>
}

type Props = MsgTextProps & StateProps & DefaultProps;

class MsgText extends Component<Props> {

  processLinksToPosts(text: string): string {

    const { topicId } = this.props;

    const regexp = /(\()(\d+)(\))/gi; // (12)
    return text.replace(regexp, (res, ...segments) => {
      const number = segments[1];
      return `(<link data-topicid='${topicId}' data-number='${number}' ></link>)`
    });
  }

  processCode1C(text: string): string {

    const regexp = /(\[1[CС]\])((.|\n|\r)*?)(\[\/1[CС]\])/gi; // [1C] text [/1C]
    return text.replace(regexp, (res, ...segments) => {
      let txt = segments[1];

      //remove first <br>
      if (txt.substr(0, 4) === "<br>")
        txt = txt.substr(4);
      return `<code>${txt}</code>`
    });
  }

  processText(text: ?string): ?string {

    if (!text)
      return text;

    const { showTooltips } = this.props;

    text = this.processCode1C(text);

    if (showTooltips === 'true')
      text = this.processLinksToPosts(text);

    return text;
  }

  render() {
    const { topicId, n, html, vote, info, style, voteColors } = this.props;

    let voteElement;
    if (vote && info.voting && topicId === info.id) {
      let voteOption = info.voting[vote - 1];
      if (voteOption)
        voteElement = <Vote info={info.voting} vote={vote} colors={voteColors} />
    }

    let voteChart;
    if (n === "0" && info.is_voting === 1 && info.voting) {
      voteChart = <VoteChart items={info.voting} topicId={topicId} colors={voteColors} />
    }

    let processedHtml = this.processText(html);
    const componentsMap = {
      link: props => <LinkToPost topicId={props['data-topicid']} number={props['data-number']} key={props.key} />,
      code: props => <Code {...props} />,
      a: props => <CustomLink {...props} parentText={processedHtml} />
    };
    let textComponent = activeHtml(processedHtml, componentsMap);

    return (
      <div className="message" style={{ ...style }}>
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

  const { info } = state.topic;

  return {
    info,
    voteColors: state.options.voteColors,
    showTooltips: state.options.items['showTooltips']
  }
}

export default (connect(mapStateToProps)(MsgText): any );