import { useMemo, useState } from "react";
import { childrenToText } from "src/utils";
import highlight from "./code_highlight";
import "./code1c.css";

const trimNewLines = (str: string) => {
  let start = 0;
  let end = str.length;

  // Remove leading newlines
  while (start < end && (str[start] === "\n" || str[start] === "\r")) {
    start++;
  }

  // Remove trailing newlines
  while (end > start && (str[end - 1] === "\n" || str[end - 1] === "\r")) {
    end--;
  }

  return str.substring(start, end);
};

const prepareText = (text: string): string => {
  // replace double new-lines
  let newtext = text
    .replace(/\n<br>/g, "\n")
    .replace(/<br>\n/g, "\n")
    .replace(/\r<br>/g, "\n")
    .replace(/<br>\r/g, "\n")
    .replace(/<br>/g, "\n")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt");

  newtext = trimNewLines(newtext);
  return highlight(newtext);
};

const Code: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [hidden, setHidden] = useState(true);

  const [text, linesCount] = useMemo(() => {
    if (!children) return ["", 0];

    let _text = childrenToText(children).join("");
    _text = prepareText(_text);

    return [_text, _text.split("\n").length];
  }, [children]);

  const onShowClick = () => {
    setHidden((prev) => !prev);
  };

  let preStyle: React.CSSProperties = {};

  if (hidden && linesCount > 7) {
    preStyle.overflow = "hidden";
    preStyle.height = "135px";
  } else {
    preStyle.overflow = "auto";
    preStyle.height = "auto";
  }

  return (
    <div style={{ marginTop: "5px" }}>
      <pre
        className="code-pre"
        style={preStyle}
        dangerouslySetInnerHTML={{ __html: text }}
      ></pre>
      {linesCount > 7 && (
        <div className="expand-button-div">
          <span className="expand-button-span" onClick={onShowClick}>
            {hidden ? `Показать: ${linesCount} строк` : "Скрыть"}
          </span>
        </div>
      )}
    </div>
  );
};

export default Code;
