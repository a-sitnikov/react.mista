import { FC, ReactElement, useState } from "react";
import { childrenToText } from "src/utils";
import highlight from "./code_highlight";
import "./code1c.css";

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

  // remove all leading|ending new-lines
  while (newtext[0] === "\n") {
    newtext = newtext.substring(1);
  }

  while (newtext.substring(newtext.length - 1) === "\n") {
    newtext = newtext.substring(0, newtext.length - 1);
  }

  return highlight(newtext);
};

const Code: FC<{ children?: React.ReactNode }> = ({
  children,
}): ReactElement => {
  const [hidden, setHidden] = useState(true);

  let text: string = "";
  if (children) {
    const textArr = childrenToText(children);
    text = textArr.join("");

    text = prepareText(text);
  }

  const onShowClick = () => {
    setHidden(!hidden);
  };

  let buttonText: string;
  let linesCount = 0;
  if (text) linesCount = text.split("\n").length;

  if (hidden) buttonText = `Показать: ${linesCount} строк`;
  else buttonText = "Скрыть";

  let buttonShow: ReactElement | null = null;
  if (linesCount > 7)
    buttonShow = (
      <div className="expand-button-div">
        <span className="expand-button-span" onClick={onShowClick}>
          {buttonText}
        </span>
      </div>
    );

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
      {buttonShow}
    </div>
  );
};

export default Code;
