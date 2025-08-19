type IProps = {
  expanded: boolean;
  onClick: () => void;
};

const ShowPreviewButton: React.FC<IProps> = ({ expanded, onClick }) => {
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
