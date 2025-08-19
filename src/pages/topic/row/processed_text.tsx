import HtmlToReact from "html-to-react";

import Code from "src/components/extensions/code1c";
import LinkToPost from "src/components/extensions/link_to_post";
import CustomLink from "src/components/extensions/custom_link";
import InternalImage from "src/components/extensions/internal-image";
import { memo } from "react";

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

const processImages = (
  text: string,
  topicId: number,
  topicDate: number,
  messageNumber: number
): string | undefined => {
  const regexp = /\[IMG_(\d*)\]/gi; // ([IMG_1])

  return text.replace(regexp, (res, ...segments) => {
    const idx = segments[0];
    return `<int_img idx='${idx}'></int_img>`;
  });
};

const processText = (
  text: string,
  topicId: number,
  topicDate: number,
  messageNumber: number
): string | undefined => {
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

const internalImageProcesor = (
  topicId: number,
  topicDate: number,
  messageNumber: number
) => ({
  shouldProcessNode: (node: any) => {
    return node?.name === "int_img";
  },
  processNode: function (node: any, children: any, index: number) {
    const idx = node.attribs["idx"];
    return (
      <InternalImage
        key={index}
        topicId={topicId}
        topicDate={topicDate}
        messageNumber={messageNumber}
        idx={idx}
      />
    );
  },
});

const ProcessedText: React.FC<{
  html: string;
  topicId: number;
  topicDate: number;
  messageNumber: number;
}> = ({ html, topicId, topicDate, messageNumber }) => {
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
};

export default memo(ProcessedText);
