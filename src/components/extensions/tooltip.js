//@flow
import React, { Component } from 'react';
import { connect } from 'react-redux'

import Draggable from 'react-draggable';

import MsgText from '../topic/row/msg_text'
import UserInfo from '../topic/row/user_info';
import './tooltip.css'

import { closeTooltip } from 'src/actions/tooltips'

import type { DefaultProps } from 'src/index'
import type { TooltipItemState } from 'src/reducers/tooltips'

type TooltipProps = {
    tooltip: TooltipItemState
}

type Props = TooltipProps & DefaultProps;

class Tooltip extends Component<Props> {

    onCloseClick;

    constructor(props) {
        super(props);
        this.onCloseClick = this.onCloseClick.bind(this);
    }

    componentDidMount() {

    }

    componentWillReceiveProps(props: Props) {

    }

    onCloseClick() {
        const { dispatch, tooltip } = this.props;
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

        return (
            <Draggable
                handle=".tooltip-header"
                defaultClassNameDragging="dragging"
                key={i}>

                <div className="tooltip-window" style={{ top: coords.y, left: coords.x }} >
                    <div className="tooltip-header">
                        {userInfo}
                    </div>
                    <div className="tooltip-text" onClick={this.onCloseClick}>
                        <MsgText data={data} topicId={keys.topicId} />
                    </div>
                    <span className="tooltip-close" onClick={this.onCloseClick}>
                        <b> x </b>
                    </span>
                </div>
            </Draggable>
        )
    }
}

export default connect()(Tooltip);