//@flow
import React, { Component } from 'react';
import { connect } from 'react-redux'

import Draggable from 'react-draggable';

import MsgText from '../topic/row/msg_text'
import UserInfo from '../topic/row/user_info';
import './tooltip.css'

import { closeTooltip } from 'src/actions/tooltips'

import TopicPreview from "./topic_preview";

import type { DefaultProps } from 'src/index'
import type { TooltipItemState } from 'src/reducers/tooltips'

type TooltipProps = {
    tooltip: TooltipItemState
}

type Props = TooltipProps & DefaultProps;

class Tooltip extends Component<Props> {

    onCloseClick;
    onMouseUp;

    constructor(props) {
        super(props);
        this.onCloseClick = this.onCloseClick.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
    }

    componentDidMount() {

    }

    componentWillReceiveProps(props: Props) {

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

    render() {

        const { keys, data, coords, i } = this.props.tooltip;

        let userInfo;
        if (!data.text) {
            data.text = 'Сообщение не найдено';
            userInfo = <b>Заголовок</b>
        } else {
            userInfo = <UserInfo data={data} isAuthor={false}/>
        }   

        if (keys.type === 'TOPIC' || keys.type === 'TOPIC_PREVIEW') 
            return (
                <Draggable
                    handle=".tooltip-header"
                    defaultClassNameDragging="dragging"
                    key={i}>

                    <div className="tooltip-window" style={{ top: coords.y, left: coords.x }} >
                        <div className="tooltip-header">
                            {userInfo}
                        </div>
                        <div className="tooltip-text" onMouseUp={this.onMouseUp} >
                            <MsgText data={data} topicId={keys.topicId} style={{maxHeight: "550px", overflowY: "auto"}} />
                        </div>
                        <span className="tooltip-close" onClick={this.onCloseClick}>
                            <b> x </b>
                        </span>
                    </div>
                </Draggable>
            )
        else if (keys.type === 'TOPIC_PREVIEW')        
            return (
                <Draggable
                    handle=".tooltip-header"
                    defaultClassNameDragging="dragging"
                    key={i}>

                    <div className="tooltip-window" style={{ top: coords.y, left: coords.x, background: "white" }} >
                        <div className="tooltip-header">
                           Заголовок
                        </div>
                         <span className="tooltip-close" onClick={this.onCloseClick}>
                            <b> x </b>
                        </span>
                        <TopicPreview topicId={keys.topicId} data={data}/>
                    </div>
                </Draggable>
            )
    }
}

export default connect()(Tooltip);