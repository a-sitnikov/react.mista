type IProps = {
  closeWindow?: (e: React.SyntheticEvent<HTMLDivElement>) => void;
} & React.PropsWithChildren;

const TooltipHeader: React.FC<IProps> = ({ children, closeWindow }) => {
  return (
    <div className="tooltip-header">
      {children}
      <div
        className="tooltip-close"
        onClick={closeWindow}
        onTouchEnd={closeWindow}
      >
        <i className="fa fa-angle-right" aria-hidden="true"></i>
        <i
          className="fa fa-angle-left"
          aria-hidden="true"
          style={{ marginLeft: "-2px" }}
        ></i>
      </div>
    </div>
  );
};

export default TooltipHeader;
