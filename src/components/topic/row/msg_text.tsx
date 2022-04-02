import { FC, ReactElement, useEffect, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import activeHtml from 'react-active-html';

import Code from 'src/components/extensions/code1c'
import LinkToPost from 'src/components/extensions/link_to_post'
import CustomLink from 'src/components/extensions/custom_link'

import VoteChart from './vote_chart'
import Vote from './vote'
import { ITopicMessage } from 'src/data/topic';
import { RootState } from 'src/data/store';
import { fetchTopicInfo } from 'src/api/topicinfo';

type IProps = {
  topicId: number,
  n: number,
  html: string,
  vote: number,
  data: ITopicMessage,
  style?: {}
}

const processLinksToPosts = (text: string, topicId: number): string => {

  const regexp = /(\()(\d+)(\))/gi; // (12)
  return text.replace(regexp, (res, ...segments) => {
    const number = segments[1];
    return `(<link data-topicid='${topicId}' data-number='${number}' ></link>)`
  });
}

const processCode1C = (text: string): string => {

  const regexp = /(\[1[CС]\])((.|\n|\r)*?)(\[\/1[CС]\])/gi; // [1C] text [/1C]
  return text.replace(regexp, (res, ...segments) => {
    let txt = segments[1];

    //remove first <br>
    if (txt.substr(0, 4) === "<br>")
      txt = txt.substr(4);
    return `<code>${txt}</code>`
  });
}

const processText = (text: string, topicId: number): string | undefined => {

  if (!text)
    return text;

  let newtext = processCode1C(text);
  newtext = processLinksToPosts(newtext, topicId);

  return newtext;
}


const mapState = (state: RootState) => {

  const { info } = state.topic;

  return {
    info,
    voteColors: state.options.voteColors,
    showTooltips: state.options.items['showTooltips']
  }
}
const connector = connect(mapState);
const MsgText: FC<ConnectedProps<typeof connector> & IProps> =
  ({ topicId, n, html, vote, info, style, voteColors }): ReactElement => {

    if (vote && info.voting && topicId === info.id)
      var _voteText = info.voting[vote - 1].text;
    else
    _voteText = null;  

    const [voteText, setVoteText] = useState(_voteText);

    const getVoteText = async () => {
      try {
        let info = await fetchTopicInfo(topicId);
        //console.log(vote, )
        setVoteText(info.voting[vote - 1].text);
      } catch (e) {
        console.error(e.message);
      } 
    }

    useEffect(() => {
      if (vote) {
        if (!voteText)
          getVoteText();
      } else 
        setVoteText(null)
    }, [vote]);

    let voteElement: ReactElement;
    if (voteText)
      voteElement = <Vote text={voteText} n={vote} colors={voteColors} />

    let voteChart: ReactElement;
    if (n === 0 && info.isVoting && info.voting) {
      voteChart = <VoteChart items={info.voting} topicId={topicId} colors={voteColors} />
    }

    let processedHtml = processText(html, topicId);
    const componentsMap = {
      link: (props: any) => <LinkToPost topicId={props['data-topicid']} number={props['data-number']} key={props.key} />,
      code: (props: any) => <Code {...props} />,
      a: (props: any) => <CustomLink {...props} parentText={processedHtml} />
    };
    const textComponent = activeHtml(processedHtml, componentsMap);

    return (
      <div className="message" style={style}>
        {voteChart}
        <div>
          {textComponent}
        </div>
        {voteElement}
      </div>
    )
  }

export default connector(MsgText);