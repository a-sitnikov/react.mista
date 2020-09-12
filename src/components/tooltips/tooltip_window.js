//@flow
import React, { Component } from 'react';
import { connect } from 'react-redux'

import Draggable from 'react-draggable';

import TooltipHeader from './tooltip_header'
import TooltipBody from './tooltip_body'

import './tooltip.css'

import { closeTooltip } from 'src/actions/tooltips'

import type { DefaultProps } from 'src/index'
import type { TooltipItemState } from 'src/reducers/tooltips'

type TooltipProps = {
    tooltip: TooltipItemState
}

type Props = TooltipProps & DefaultProps;

class TooltipWindow extends Component<Props> {
    
    onCloseClick = () => {
        const { dispatch, tooltip } = this.props;
        dispatch(closeTooltip(tooltip.keys));
    }

    render() {
        const { coords, i } = this.props.tooltip;

        let axis;
        let position;
        if (window.innerWidth <= 768 ) {
            axis = "y";
            position = {top: coords.y, left: 5};
        } else {
            axis = "both";
            position = {top: coords.y, left: Math.min(coords.x, window.innerWidth - 670)}
        }
        
        let [header, body] = React.Children.toArray(this.props.children);

        return (
            <Draggable
                axis={axis}
                handle=".tooltip-header"
                defaultClassNameDragging="dragging"
                key={i}>

                <div className="tooltip-window" style={{ ...position }} onWheel={this.props.onWheel}>
                    <TooltipHeader closeWindow={this.onCloseClick}>
                        {header.props.children}
                    </TooltipHeader>
                    <TooltipBody onTouchMove={this.props.onTouchMove}>
                        {body.props.children}
                    </TooltipBody>
                </div>
            </Draggable>
        )
    }
}

export default connect()(TooltipWindow);