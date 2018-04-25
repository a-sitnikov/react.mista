//@flow
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { showTooltip } from '../../actions/tooltips'

import { getMaxPage } from 'src/utils';

import type { State } from 'src/reducers'
import type { DefaultProps } from 'src/components'
import type { ResponseInfo, ResponseMessages } from 'src/api'
import { defaultTopicState } from 'src/reducers/topic'

type LinkToPostProps = {
    topicId: string,
    number: number,
    style: {}
}

type StateProps = {
    info: ResponseInfo,
    items: ResponseMessages
}

type Props = LinkToPostProps & StateProps & DefaultProps;

class LinkToPost extends Component<Props> {

    onMouseOver;
    onMouseOut;
    showToolTip;
    timer;

    constructor(props) {
        super(props);
        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
        this.showToolTip = this.showToolTip.bind(this);
    }

    onMouseOver = (event) => {
        event.persist();
        this.timer = setTimeout(() => this.showToolTip(event), 500);
    }

    onMouseOut = (event) => {
        clearTimeout(this.timer);
    }

    showToolTip(e) {
        const { topicId, number, dispatch, items, info } = this.props;

        const coords = {
            x: e.pageX,
            y: e.pageY
        }
        let data;
        if (topicId === info.id) {
            data = items.find(value => String(number) === value.n);
        }

        const keys = {
            type: 'TOPIC',
            topicId,
            number          
        }
        
        dispatch(showTooltip(
            keys,
            coords,
            data
        ));
    }

    render() {

        const { topicId, number, style, children } = this.props;
        const page = getMaxPage(number);

        let pageParam = '';
        if (page > 1)
            pageParam = `&page=${page}`;

	let text;
        if (children)
    	    text = children;
        else
            text = number;	

        return (
            <a href={`${window.hash}/topic.php?id=${topicId}${pageParam}#${number}`}
                onMouseOver={this.onMouseOver}
                onMouseOut={this.onMouseOut}
                style={{...style}}
            >{text}</a>
        )
    }
}

const mapStateToProps = (state: State): StateProps => {

    const {
        items, info
    } = state.topic || defaultTopicState;

    return {
        items,
        info
    }
}

export default connect(mapStateToProps)(LinkToPost);