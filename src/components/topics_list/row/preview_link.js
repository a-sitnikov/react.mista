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

    onClick = () => {
        const { topicId, dispatch } = this.props;

        dispatch({
            type: 'TOGGLE_PREVIEW',
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

export default ( connect()(PreviewLink): any );