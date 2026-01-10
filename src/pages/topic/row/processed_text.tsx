import { Interweave, type InterweaveProps } from "interweave";
import { memo } from "react";
import Code from "src/components/extensions/code1c";
import CustomLink from "src/components/extensions/custom_link";
import InternalImage from "src/components/extensions/internal-image";
import LinkToPost from "src/components/extensions/link_to_post";

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
  _topicId: number,
  _topicDate: number,
  _messageNumber: number
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

const ProcessedText: React.FC<{
  html: string;
  topicId: number;
  topicDate: number;
  messageNumber: number;
}> = ({ html, topicId, topicDate, messageNumber }) => {
  const processedHtml = processText(html, topicId, topicDate, messageNumber);

  const transform: InterweaveProps["transform"] = (node, children) => {
    const tagName = node.tagName.toLowerCase();
    switch (tagName) {
      case "a": {
        const href = node.getAttribute("href");
        return (
          <CustomLink href={href} parentText={processedHtml}>
            {children}
          </CustomLink>
        );
      }

      case "link": {
        const number = parseInt(node.getAttribute("data-number"));
        return <LinkToPost topicId={topicId} number={number} />;
      }

      case "code":
      case "pre":
        return <Code>{children}</Code>;

      case "int_img": {
        const idx = node.getAttribute("idx");
        return (
          <InternalImage
            topicId={topicId}
            topicDate={topicDate}
            messageNumber={messageNumber}
            idx={idx}
          />
        );
      }

      default:
        return undefined;
    }
  };

  return <Interweave content={processedHtml} transform={transform} />;
};

export default memo(ProcessedText);
