//@flow
import React, { Component } from 'react'
import { connect } from 'react-redux'

import type { DefaultProps } from 'src/components'

type PreviewLinkProps = {
    topicId: string,
    expanded: boolean
};

type Props = PreviewLinkProps & DefaultProps;

class PreviewLink extends Component<Props> {

    onClick;

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        const { topicId, dispatch, expanded } = this.props;

        dispatch({
            type: expanded ? 'CLOSE_PREVIEW' : 'SHOW_PREVIEW',
            topicId 
        });
    }

    render() {

        const { expanded } = this.props;
        let text;
        if (expanded)
            text = '-'
        else
            text = '+'    

        return (
            <div className="cell-preview-link" onClick={this.onClick}>
                <span>{text}</span>
            </div>
        )        
    }

}

export default connect()(PreviewLink);