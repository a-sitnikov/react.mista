import { FC, ReactElement } from "react";

type IProps = {
  expanded: boolean;
  onClick: () => void;
};

const ShowPreviewButton: FC<IProps> = ({ expanded, onClick }): ReactElement => {
  return (
    <div className="cell-preview-link" onClick={onClick}>
      <span>
        {expanded ? (
          <i className="fa fa-minus-square-o agh" aria-hidden="true"></i>
        ) : (
          <i className="fa fa-plus-square-o agh" aria-hidden="true"></i>
        )}
      </span>
    </div>
  );
};

export default ShowPreviewButton;
