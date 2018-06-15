//@flow
import React, { Component } from 'react';
import { connect } from 'react-redux'

import Draggable from 'react-draggable';

import MsgText from '../topic/row/msg_text'
import UserInfo from '../topic/row/user_info';
import './tooltip.css'

import { closeTooltip, changeTooltipData } from 'src/actions/tooltips'

import type { DefaultProps } from 'src/index'
import type { TooltipItemState } from 'src/reducers/tooltips'

type TooltipProps = {
    tooltip: TooltipItemState
}

type Props = TooltipProps & DefaultProps;

class Tooltip extends Component<Props> {

    onCloseClick;
    onMouseUp;
    onWheel;

    constructor(props) {
        super(props);
        this.onCloseClick = this.onCloseClick.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onWheel  = this.onWheel.bind(this);
    }

    componentDidMount() {

    }

    componentWillReceiveProps(props: Props) {
        //console.log(props);
    }

    onCloseClick() {
        const { dispatch, tooltip } = this.props;
        dispatch(closeTooltip(tooltip.keys));
    }
    
    onMouseUp() {
        const { dispatch, tooltip } = this.props;
        if (window.getSelection().type === 'Caret')
            dispatch(closeTooltip(tooltip.keys));
    }

    onWheel(e) {
        const { dispatch } = this.props;
        const { keys } = this.props.tooltip;
        if (keys.type !== 'TOPIC_PREVIEW') return;
        
        e.preventDefault();
        if (e.nativeEvent.deltaY > 0) {
            dispatch(changeTooltipData(keys, keys.number + 1))
        } else {
            dispatch(changeTooltipData(keys, keys.number - 1))
        }
    }

    render() {

        const { keys, data, coords, i } = this.props.tooltip;

        let userInfo;
        if (!data.text) {
            data.text = `Сообщение не найдено: ${keys.number}`;
            userInfo = <b>Заголовок</b>
        } else {
            userInfo = <UserInfo data={data} isAuthor={false}/>
        }   

        let axis;
        let position;
        if (window.innerWidth <= 768 ) {
            axis = "y";
            position = {top: coords.y, left: 5};
        } else {
            axis = "both";
            position = {top: coords.y, left: Math.min(coords.x, window.innerWidth - 670)}
        }
        console.log(position)
        if (keys.type === 'TOPIC' || keys.type === 'TOPIC_PREVIEW') 
            return (
                <Draggable
                    axis={axis}
                    handle=".tooltip-header"
                    defaultClassNameDragging="dragging"
                    key={i}>

                    <div className="tooltip-window" style={{ ...position }} onWheel={this.onWheel}>
                        <div className="tooltip-header">
                            {userInfo}
                            <div className="tooltip-close" onClick={this.onCloseClick}>
                                <span className="tooltip-close-x">x</span>
                            </div>
                        </div>
                        <div className="tooltip-text" onMouseUp={this.onMouseUp} >
                            <MsgText data={data} topicId={keys.topicId} style={{maxHeight: "550px", overflowY: "auto"}} />
                        </div>
                    </div>
                </Draggable>
            )
    }
}

export default connect()(Tooltip);