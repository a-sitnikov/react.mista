//@flow
import React, { Component } from 'react'
import { connect } from 'react-redux'

import type { DefaultProps } from '../../index'

type PreviewLinkProps = {
    topicId: string,
    preview: any
};

type Props = PreviewLinkProps & DefaultProps;

class PreviewLink extends Component<Props> {

    onClick;

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        const { topicId, dispatch, preview } = this.props;

        if (preview)
            dispatch({
                type: 'CLOSE_PREVIEW',
                topicId 
            });
        else
            dispatch({
                type: 'SHOW_PREVIEW',
                topicId 
            });
    }

    render() {

        const { preview } = this.props;
        let text;
        if (preview)
            text = '-'
        else
            text = '+'    

        return (
            <span className="plus-minus" onClick={this.onClick}>{text}</span>
        )        
    }

}

export default connect()(PreviewLink);