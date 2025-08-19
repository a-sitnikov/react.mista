import { Children, ReactElement } from "react";
import Draggable from "react-draggable";

import TooltipHeader from "./tooltip_header";
import TooltipBody from "./tooltip_body";

import "./tooltip.css";

import { useActionCreators } from "src/store";
import { ITooltipItem, tooltipsActions } from "src/store";

type IProps = {
  tooltip: ITooltipItem;
  zIndex?: number;
  children?: React.ReactNode;
};

const TooltipWindow: React.FC<IProps> = ({ tooltip, zIndex, children }) => {
  const actions = useActionCreators(tooltipsActions);

  const onCloseClick = () => {
    actions.close(tooltip.keys);
  };

  const { coords } = tooltip;

  let axis: "both" | "x" | "y" | "none";
  let position: {
    top: number;
    left: number;
  };

  if (window.innerWidth <= 768) {
    axis = "y";
    position = { top: coords.y, left: 5 };
  } else {
    axis = "both";
    position = {
      top: coords.y,
      left: Math.min(coords.x, window.innerWidth - 670),
    };
  }

  let [header, body] = Children.toArray(children);

  return (
    <Draggable
      axis={axis}
      handle=".tooltip-header"
      defaultClassNameDragging="dragging"
      key={zIndex}
    >
      <div className="tooltip-window" style={{ ...position }}>
        <TooltipHeader closeWindow={onCloseClick}>
          {(header as ReactElement).props.children}
        </TooltipHeader>
        <TooltipBody>{(body as ReactElement).props.children}</TooltipBody>
      </div>
    </Draggable>
  );
};

export default TooltipWindow;
