type IProps = {
  closeWindow?: (e: React.SyntheticEvent<HTMLDivElement>) => void;
} & React.PropsWithChildren;

const TooltipHeader: React.FC<IProps> = ({ children, closeWindow }) => {
  return (
    <div className="tooltip-header">
      {children}
      <div
        className="relative size-[25px] cursor-pointer font-bold ml-auto hover:bg-bgHover rounded-sm flex justify-center items-center"
        onClick={closeWindow}
        onTouchEnd={closeWindow}
      >
        <i className="fa fa-angle-right" aria-hidden="true"></i>
        <i className="fa fa-angle-left ml-[-2px]" aria-hidden="true"></i>
      </div>
    </div>
  );
};

export default TooltipHeader;
