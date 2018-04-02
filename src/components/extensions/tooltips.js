import React, { Component } from 'react';
import { connect } from 'react-redux'

import Draggable from 'react-draggable';

import MsgText from '../topic/row/msg_text'
import UserInfo from '../topic/row/user_info';
import './tooltip.css'

class Tooltip extends Component {

    constructor(props) {
        super(props);
        this.onCloseClick = this.onCloseClick.bind(this);

        this.state = { key: 0, isDragging: false };
    }

    onCloseClick() {
        const { dispatch, data } = this.props;
        dispatch({
            type: 'CLOSE_TOOLTIP',
            hash: data.hash
        });
    }

    render() {

        const { keys, data, coords, i } = this.props.data;

        let userInfo;
        if (!data.text) {
            data.text = 'Сообщение не найдено';
            userInfo = <b>Заголовок</b>
        } else {
            userInfo = <UserInfo data={data}/>
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
                        <MsgText data={data} info={{ id: keys.topicId }} />
                    </div>
                    <span className="tooltip-close" onClick={this.onCloseClick}>
                        <b> x </b>
                    </span>
                </div>
            </Draggable>
        )
    }
}

class TooltipsList extends Component {

    render() {

        const { items, dispatch } = this.props;

        return (
            <div>
                {items.map((item, i) => (
                    <Tooltip key={item.hash} data={item} dispatch={dispatch} />
                ))}
            </div>
        )
    }
}

const mapStateToProps = state => {

    const {
        items
    } = state.tooltips || {
        items: []
    }

    return {
        items,
    }
}

export default connect(mapStateToProps)(TooltipsList);