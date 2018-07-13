//@flow
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { showTooltip } from '../../actions/tooltips'

import { getMaxPage } from 'src/utils';

import type { State } from 'src/reducers'
import type { DefaultProps } from 'src/components'
import type { ResponseInfo, ResponseMessages } from 'src/api'

type LinkToPostProps = {
    topicId: string,
    number: number,
    isPreview: boolean,
    style: {}
}

type StateProps = {
    info: ResponseInfo,
    items: ResponseMessages,
    tooltipDelay: string
}

type Props = LinkToPostProps & StateProps & DefaultProps;

class LinkToPost extends Component<Props> {

    onMouseOver;
    onMouseOut;
    onClick;
    showToolTip;
    timer;

    constructor(props) {
        super(props);
        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
        this.onClick = this.onClick.bind(this);
        this.showToolTip = this.showToolTip.bind(this);
    }

    onMouseOver = (event) => {
        event.persist();
        const { tooltipDelay } = this.props;
        this.timer = setTimeout(() => this.showToolTip(event), +tooltipDelay);
    }
    
    onClick = (event) => {
        event.stopPropagation();
        clearTimeout(this.timer);
        this.showToolTip(event);
    }

    onMouseOut = (event) => {
        clearTimeout(this.timer);
    }

    showToolTip(e) {
        const { topicId, number, dispatch, items, info, isPreview } = this.props;

        const coords = {
            x: e.pageX,
            y: e.pageY - 50 // remove navbar margin-top
        }
        let data;
        if (topicId === info.id) {
            data = items.find(value => String(number) === value.n);
        }

        const keys = {
            type: isPreview ? 'TOPIC_PREVIEW' : 'TOPIC',
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

        const { topicId, number, style, children, info } = this.props;
        const page = getMaxPage(number);

        let pageParam = '';
        if (page > 1)
            pageParam = `&page=${page}`;

	    let text;
        if (children)
    	    text = children;
        else
            text = number;

        let a;
        if (topicId === info.id || !isNaN(text) )
            a = (
                <span
                    onMouseOver={this.onMouseOver}
                    onMouseOut={this.onMouseOut}
                    onClick={this.onClick}
                    style={{ cursor: "pointer", color: "#00C", ...style}}
                >{text}</span>
            )
        else 
            a = (
                <span>
                    <a href={`${window.hash}/topic.php?id=${topicId}${pageParam}#${number}`}
                        style={{...style}}
                    >{text}</a>{' '} 
                    (<span onMouseOver={this.onMouseOver}
                        onMouseOut={this.onMouseOut}
                        onClick={this.onClick}
                        style={{cursor:"pointer", color: "#00C"}}
                     >{number}</span>)               
                </span>
            )

        return a;
    }
}

const mapStateToProps = (state: State): StateProps => {

    const {
        items, info
    } = state.topic;

    return {
        items,
        info,
        tooltipDelay: state.options.items['tooltipDelay']
    }
}

export default connect(mapStateToProps)(LinkToPost);