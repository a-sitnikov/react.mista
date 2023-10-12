import { FC, ReactElement } from "react";

type IProps = {
  onScroll?: (delta: number) => void;
  children?: React.ReactNode;
};

const TooltipBody: FC<IProps> = ({ children, onScroll }): ReactElement => {
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
