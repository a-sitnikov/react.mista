//@flow
import React, { Component } from 'react';
import { connect } from 'react-redux'

import Draggable from 'react-draggable';

import MsgText from '../topic/row/msg_text'
import UserInfo from '../topic/row/user_info';

import TooltipHeader from './tooltip_header'
import TooltipBody from './tooltip_body'
import './tooltip.css'

import { closeTooltip, loadTooltipData } from 'src/actions/tooltips'

import type { DefaultProps } from 'src/index'
import type { TooltipItemState } from 'src/reducers/tooltips'

type TooltipProps = {
    tooltip: TooltipItemState
}

type Props = TooltipProps & DefaultProps;

class Tooltip extends Component<Props> {
    
    data: any;
    text: string;

    componentWillMount() {
        const { tooltip, info, items, item0 } = this.props;

        this.text = '';
        if (tooltip.keys.topicId === info.id) {
            if (String(tooltip.keys.number) === "0")
                this.data = item0;
            else
                this.data = items.find(item => item.n === String(tooltip.keys.number));

            if (this.data)
                this.text = this.data.text;
        }
    }

    componentDidMount() {

        const { tooltip, dispatch } = this.props;

        if (!this.data) {
            dispatch(loadTooltipData(tooltip.keys, tooltip.keys.number));
            this.text = "Сообщение загружается";
        }
    }    

    componentWillReceiveProps(props) {

        if (props.tooltip.error) {
            this.data = props.tooltip.data;
            this.text = props.tooltip.error;      

        } else if (props.tooltip.data) {
            this.data = props.tooltip.data;
            this.text = this.data.text;      
        }    
    }
    
    onCloseClick = () => {
        const { dispatch, tooltip } = this.props;
        dispatch(closeTooltip(tooltip.keys));
    }

    onWheel = (e) => {
        const { dispatch } = this.props;
        const { keys } = this.props.tooltip;
        if (keys.type !== 'TOPIC_PREVIEW') return;
        
        e.preventDefault();
        if (e.nativeEvent.deltaY > 0) {
            dispatch(loadTooltipData(keys, keys.number + 1))
        } else {
            dispatch(loadTooltipData(keys, keys.number - 1))
        }
    }

    render() {
       const { keys, data, coords, i } = this.props.tooltip;

        let header;
        if (!this.data) {
            header = <b>Заголовок</b>
        } else {
            header = <UserInfo data={data} isAuthor={false}/>
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
        
        if (keys.type === 'TOPIC' || keys.type === 'TOPIC_PREVIEW') 
            return (
                <Draggable
                    axis={axis}
                    handle=".tooltip-header"
                    defaultClassNameDragging="dragging"
                    key={i}>

                    <div className="tooltip-window" style={{ ...position }} onWheel={this.onWheel}>
                        <TooltipHeader onCloseClick={this.onCloseClick}>
                            {header}
                        </TooltipHeader>
                        <TooltipBody>
                            <MsgText 
                                data={this.data} 
                                html={this.text} 
                                topicId={keys.topicId} 
                                style={{maxHeight: "550px", overflowY: "auto"}} 
                            />
                        </TooltipBody>
                    </div>
                </Draggable>
            )
    }
}
const mapStateToProps = (state) => {

    const {
        info,
        items,
        item0
    } = state.topic;

    return {
        info,
        items,
        item0
    }
}

export default connect(mapStateToProps)(Tooltip);