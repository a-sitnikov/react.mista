//@flow
import React, { Component } from 'react';
import { connect } from 'react-redux'

import * as API from 'src/api'

import MsgText from '../topic/row/msg_text'
import UserInfo from '../topic/row/user_info';

import Tooltipwindow from './tooltip_window'
import TooltipHeader from './tooltip_header'
import TooltipBody from './tooltip_body'
import './tooltip.css'

import { closeTooltip } from 'src/actions/tooltips'

import type { DefaultProps } from 'src/index'
import type { TooltipItemState } from 'src/reducers/tooltips'

type TooltipProps = {
    tooltip: TooltipItemState,
    topicId: string,
    number: number
}

type Props = TooltipProps & DefaultProps;

class TooltipPreview extends Component<Props> {
    
    data: any;
    text: string;
    fetchData: any;
    state: any;

    constructor(props) {
        super();
        
        const { topicId, number, info, items, item0 } = props;

        let text = '';
        let data;
        if (topicId === info.id) {
            if (number === 0)
                data = item0;
            else
                data = items.find(item => item.n === String(number));

            if (data)
                text = data.text;
        }

        this.state ={
            data,
            text,
            number
        }
    }

    fetchData = async (number) => {

        if (number < 0) return;

        let data;
        let text = '';

        try {
            const json = await API.getTopicMessages({
                id: this.props.topicId,
                from: number,
                to: number + 1
            });
            if (json && json.length > 0)
                data = json.find(val => val.n === String(number));

            if (data)                
                text = data.text;
            else 
                text = `Сообщение не найдено ${number}`;

        } catch (e) {
            text = e.message;
        }

        // $FlowFixMe
        this.setState({ data, text, number });
    }

    componentDidMount() {

        if (!this.state.data)
            this.fetchData(this.state.number);

    }    
    
    onCloseClick = () => {
        const { dispatch, tooltip } = this.props;
        dispatch(closeTooltip(tooltip.keys));
    }

    onWheel = (e) => {
        const { keys } = this.props.tooltip;
        if (keys.type !== 'TOPIC_PREVIEW') return;
        
        e.preventDefault();
        if (e.nativeEvent.deltaY > 0) {
            this.fetchData(this.state.number + 1)
        } else {
            this.fetchData(this.state.number - 1)
        }
    }

    render() {
       const { keys, topicId } = this.props.tooltip;

        if (!this.state.text)
            return null;

        let header;
        if (!this.state.data) {
            header = <b>Заголовок</b>
        } else {
            header = <UserInfo data={this.state.data} isAuthor={false}/>
        }   

        if (keys.type === 'TOPIC' || keys.type === 'TOPIC_PREVIEW') 
            return (
                <Tooltipwindow tooltip={this.props.tooltip} onWheel={this.onWheel}>
                    <TooltipHeader onCloseClick={this.onCloseClick}>
                        {header}
                    </TooltipHeader>
                    <TooltipBody>
                        <MsgText 
                            data={this.state.data} 
                            html={this.state.text} 
                            topicId={topicId} 
                            style={{maxHeight: "550px", overflowY: "auto"}} 
                        />
                    </TooltipBody>
                </Tooltipwindow>
                /*}
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
                                data={this.state.data} 
                                html={this.state.text} 
                                topicId={topicId} 
                                style={{maxHeight: "550px", overflowY: "auto"}} 
                            />
                        </TooltipBody>
                    </div>
                </Draggable>
                */
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

export default connect(mapStateToProps)(TooltipPreview);