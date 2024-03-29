import { FC, ReactElement } from "react";

import "./error.css";

type IProps = {
  text: string;
};

const ErrorElem: FC<IProps> = ({ text }): ReactElement | null => {
  if (!text) return null;

  return (
    <div className="error" dangerouslySetInnerHTML={{ __html: text }}></div>
  );
};

export default ErrorElem;
