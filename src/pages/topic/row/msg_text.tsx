import { FC, ReactElement, useEffect, useState, memo } from "react";
import HtmlToReact from "html-to-react";

import Code from "src/components/extensions/code1c";
import LinkToPost from "src/components/extensions/link_to_post";
import CustomLink from "src/components/extensions/custom_link";

import VoteChart from "./vote_chart";
import Vote from "./vote";
import { useAppSelector } from "src/store";
import { fetchTopicInfo } from "src/api";
import InternalImage from "src/components/extensions/internal-image";
import { PhotoProvider } from "react-photo-view";

type IProps = {
  topicId: number;
  topicDate: number;
  n: number;
  html: string;
  vote: number;
  style?: {};
};

const processLinksToPosts = (text: string, topicId: number): string => {
  const regexp = /(\()(\d+)(\))(?![^<>]*<\/)/gi; // (12)
  return text.replace(regexp, (res, ...segments) => {
    const number = segments[1];
    return `(<link data-topicid='${topicId}' data-number='${number}'></link>)`;
  });
};

const processCode1C = (text: string): string => {
  return text
    .replace(/\[1[CС]\]/gi, "<code>") //[1C]
    .replace(/<1[CС]>/gi, "<code>") //<1C>
    .replace(/\[\/1[CС]\]/gi, "</code>") //[/1C]
    .replace(/<\/1[CС]>/gi, "</code>"); //</1C>
};


const processImages = (text: string, topicId: number, topicDate: number, messageNumber: number): string | undefined => {
  const regexp = /\[IMG_(\d*)\]/gi; // ([IMG_1])

  return text.replace(regexp, (res, ...segments) => {
    const idx = segments[0];
    return `<int_img idx='${idx}'></int_img>`;
    });
};

const processText = (text: string, topicId: number, topicDate: number, messageNumber: number): string | undefined => {
  if (!text) return text;

  let newtext = processCode1C(text);
  newtext = processLinksToPosts(newtext, topicId);
  newtext = processImages(newtext, topicId, topicDate, messageNumber);

  return newtext;
};

const htmlToReactParser = HtmlToReact.Parser();
const processNodeDefinitions = HtmlToReact.ProcessNodeDefinitions();
const isValidNode = () => true;

const linkToPostProcessor = {
  shouldProcessNode: (node: any): boolean => {
    return node?.name === "link";
  },
  processNode: (
    node: any,
    children: any,
    index: number
  ): React.ReactElement => {
    const topicId = node.attribs["data-topicid"];
    const number = node.attribs["data-number"];
    return <LinkToPost key={index} topicId={topicId} number={number} />;
  },
};

const codeProcessor = {
  shouldProcessNode: (node: any) => {
    return node?.name === "code" || node?.name === "pre";
  },
  processNode: (node: any, children: any, index: number) => {
    return <Code key={index}>{children}</Code>;
  },
};

const linkProcessor = (processedHtml: string) => ({
  // <custom link>
  shouldProcessNode: (node: any) => {
    return node?.name === "a";
  },
  processNode: function (node: any, children: any, index: number) {
    const href = node.attribs["href"];
    return (
      <CustomLink key={index} href={href} parentText={processedHtml}>
        {children}
      </CustomLink>
    );
  },  
});

const internalImageProcesor = (topicId: number, topicDate: number,  messageNumber: number ) => ({
  shouldProcessNode: (node: any) => {
    return node?.name === "int_img";
  },
  processNode: function (node: any, children: any, index: number) {
    const idx = node.attribs["idx"];
    return (
      <InternalImage key={index} topicId={topicId} topicDate={topicDate} messageNumber={messageNumber} idx={idx}/>
    );
  },  
})

const ProcessedText: FC<{ html: string; topicId: number, topicDate: number,  messageNumber: number}> = memo(
  ({ html, topicId, topicDate, messageNumber }): ReactElement => {
    const processedHtml = processText(html, topicId, topicDate, messageNumber);
    const processingInstructions = [
      linkToPostProcessor,
      codeProcessor,
      linkProcessor(processedHtml),
      internalImageProcesor(topicId, topicDate, messageNumber),
      {
        // Anything else
        shouldProcessNode: () => true,
        processNode: processNodeDefinitions.processDefaultNode,
      },
    ];

    const reactComponent = htmlToReactParser.parseWithInstructions(
      processedHtml,
      isValidNode,
      processingInstructions
    );

    return <>{reactComponent}</>;
  }
);

const MsgText: FC<IProps> = ({
  topicId,
  topicDate,
  n,
  html,
  vote,
  style,
}): ReactElement => {
  const info = useAppSelector((state) => state.topic.info);
  const voteColors = useAppSelector((state) => state.options.voteColors);

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
    };

    if (vote && !initialVoteText) {
      getVoteText();
    }
  }, [vote, initialVoteText, topicId]);

  const showVote = vote !== 0 && voteText !== null;
  let voteChart: ReactElement;
  if (n === 0 && info.isVoting && info.voting) {
    voteChart = (
      <VoteChart items={info.voting} topicId={topicId} colors={voteColors} />
    );
  }

  return (
    <div className="message" style={style}>
      {voteChart}
      <div>
        <PhotoProvider>
          <ProcessedText html={html} topicId={topicId} topicDate={topicDate} messageNumber={n}/>
        </PhotoProvider>
      </div>
      {showVote && <Vote text={voteText} n={vote} colors={voteColors} />}
    </div>
  );
};

export default MsgText;
