//@flow
import React, { Component } from 'react';
import { connect } from 'react-redux'

import * as API from 'src/api'

import MsgText from '../topic/row/msg_text'
import UserInfo from '../topic/row/user_info';

import TooltipWindow from './tooltip_window'
import TooltipHeader from './tooltip_header'
import TooltipBody from './tooltip_body'
import './tooltip.css'

import type { DefaultProps } from 'src/index'
import type { TooltipItemState } from 'src/reducers/tooltips'

type TooltipProps = {
    tooltip: TooltipItemState,
    topicId: string,
    number: number
}

type Props = TooltipProps & DefaultProps;

class Tooltip extends Component<Props> {
    
    data: any;
    text: string;
    fetchData: any;
    state: any;

    constructor(props) {
        super();
        
        const { keys, info, items, item0 } = props;

        let text = '';
        let data;
        if (keys.topicId === info.id) {
            if (keys.number === 0)
                data = item0;
            else
                data = items.find(item => item.n === String(keys.number));

            if (data)
                text = data.text;
        }

        this.state ={
            data,
            text,
            number: keys.number
        }
    }

    fetchData = async (number) => {

        if (number < 0) return;

        let data;
        let text = '';
        const topicId = this.props.keys.topicId;

        try {
            data = await API.getMessage(topicId, number);
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
    
    onTouchMove = (deltaX) => {

        const { keys } = this.props.tooltip;
        if (keys.type !== 'TOPIC_PREVIEW') return;
         if (deltaX > 0) {
            this.fetchData(this.state.number + 1)
        } else {
            this.fetchData(this.state.number - 1)
        }
    }

    componentDidMount() {

        if (!this.state.data)
            this.fetchData(this.state.number);

    }
    
    render() {
       const { keys } = this.props.tooltip;

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
                <TooltipWindow tooltip={this.props.tooltip} onWheel={this.onWheel} onTouchMove={this.onTouchMove}>
                    <TooltipHeader>
                        {header}
                    </TooltipHeader>
                    <TooltipBody>
                        <MsgText 
                            data={this.state.data} 
                            html={this.state.text} 
                            topicId={keys.topicId} 
                            style={{maxHeight: "min(550px, 80vh)", overflowY: "auto"}} 
                        />
                    </TooltipBody>
                </TooltipWindow>
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