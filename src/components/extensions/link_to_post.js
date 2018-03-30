import React, { Component } from 'react'
import { connect } from 'react-redux'

import { showTooltip } from '../../actions/tooltips'

import { maxPage } from '../../utils';

class LinkToPost extends Component {

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

        const { topicId, number } = this.props;
        const page = maxPage(number);

        let pageParam = '';
        if (page > 1)
            pageParam = `&page=${page}`;

        return (
            <a href={`topic.php?id=${topicId}${pageParam}#${number}`}
                onMouseOver={this.onMouseOver}
                onMouseOut={this.onMouseOut}
            >{number}</a>
        )
    }
}

const mapStateToProps = state => {

    const {
        items, info
    } = state.topic || {
        items: [],
        info: {}
    }

    return {
        items,
        info
    }
}

export default connect(mapStateToProps)(LinkToPost);