type IProps = {
  onScroll?: (delta: number) => void;
} & React.PropsWithChildren;

const TooltipBody: React.FC<IProps> = ({ children, onScroll }) => {
  let startX = 0;

  const onTouchStart = (e: React.TouchEvent<HTMLElement>) => {
    startX = e.nativeEvent.changedTouches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent<HTMLElement>) => {
    if (!onScroll) return;

    let endX = e.nativeEvent.changedTouches[0].clientX;
    if (Math.abs(endX - startX) > 100) onScroll(-endX + startX);
  };

  return (
    <div
      className="tooltip-text"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {children}
    </div>
  );
};

export default TooltipBody;
