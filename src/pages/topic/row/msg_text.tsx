import { FC, ReactElement, useEffect, useState, memo } from 'react'
import activeHtml from 'react-active-html';

import Code from 'src/components/extensions/code1c'
import LinkToPost from 'src/components/extensions/link_to_post'
import CustomLink from 'src/components/extensions/custom_link'

import VoteChart from './vote_chart'
import Vote from './vote'
import { useAppSelector } from 'src/store';
import { ITopicMessage } from 'src/store';
import { fetchTopicInfo } from 'src/api';

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
    return `(<link data-topicid='${topicId}' data-number='${number}'></link>)`
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

const ProcessedText: FC<{ html: string, topicId: number }> = memo(({ html, topicId }): ReactElement => {

  let processedHtml = processText(html, topicId);
  const componentsMap = {
    link: (props: any) => <LinkToPost topicId={props['data-topicid']} number={props['data-number']} key={props.key} />,
    code: (props: any) => <Code {...props} />,
    a: (props: any) => <CustomLink {...props} parentText={processedHtml} />
  };
  const textComponent = activeHtml(processedHtml, componentsMap);

  return (
      <>
        {textComponent}
      </>  
  )
})

const MsgText: FC<IProps> =
  ({ topicId, n, html, vote, style }): ReactElement => {

    const info = useAppSelector(state => state.topic.info);
    const voteColors = useAppSelector(state => state.options.voteColors);

    let initialVoteText: string = null;
    if (vote && info.voting && topicId === info.id)
      initialVoteText = info.voting[vote - 1].text;

    const [voteText, setVoteText] = useState(initialVoteText);

    useEffect(() => {

      const getVoteText = async () => {
        try {
          const _info = await fetchTopicInfo(topicId);
          setVoteText(_info.voting[vote - 1].text);
        } catch (e) {
          console.error(e.message);
        }
      }
      
      if (vote && !initialVoteText) {
        getVoteText();
      }

    }, [vote, initialVoteText, topicId]);

    const showVote = (vote !== 0) && (voteText !== null);
    let voteChart: ReactElement;
    if (n === 0 && info.isVoting && info.voting) {
      voteChart = <VoteChart items={info.voting} topicId={topicId} colors={voteColors} />
    }

    return (
      <div className="message" style={style}>
        {voteChart}
        <div>
          <ProcessedText html={html} topicId={topicId} />
        </div>
        {showVote && <Vote text={voteText} n={vote} colors={voteColors} />}
      </div>
    )
  }

export default MsgText;