import React, { FC, ReactElement } from 'react'

import Draggable from 'react-draggable';

import TooltipHeader from './tooltip_header'
import TooltipBody from './tooltip_body'

import './tooltip.css'

import tooltipsSlice from 'src/data/tooltips/reducer'

import { useAppDispatch } from 'src/data/store';
import { ITooltipItem } from 'src/data/tooltips';

type IProps = {
  tooltip: ITooltipItem,
  zIndex?: number,
}

const TooltipWindow: FC<IProps> = ({ tooltip, zIndex, children }): ReactElement => {

  const dispatch = useAppDispatch();

  const onCloseClick = () => {
    dispatch(tooltipsSlice.actions.close(tooltip.keys));
  }

  const { coords } = tooltip;

  let axis: "both" | "x" | "y" | "none";;
  let position: {
    top: number,
    left: number
  };

  if (window.innerWidth <= 768) {
    axis = "y";
    position = { top: coords.y, left: 5 };
  } else {
    axis = "both";
    position = { top: coords.y, left: Math.min(coords.x, window.innerWidth - 670) }
  }

  let [header, body] = React.Children.toArray(children);

  return (
    <Draggable
      axis={axis}
      handle=".tooltip-header"
      defaultClassNameDragging="dragging"
      key={zIndex}>

      <div className="tooltip-window" style={{ ...position }}>
        <TooltipHeader closeWindow={onCloseClick}>
          {(header as ReactElement).props.children}
        </TooltipHeader>
        <TooltipBody>
          {(body as ReactElement).props.children}
        </TooltipBody>
      </div>
    </Draggable>
  )

}

export default TooltipWindow;