//@flow
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchTopicPreviewText } from 'src/actions/topic_preview'

import MsgText from 'src/components/topic/row/msg_text'
import type { DefaultProps } from 'src/components'
import type { ResponseMessage } from 'src/api'

import PreviewHeader from './preview_header'
import './topic_preview.css'

type TopicPreviewProps = {
    topicId: string,
    data?: ResponseMessage   
}

type Props = TopicPreviewProps & DefaultProps;

class TopicPreview extends Component<Props> {

    componentDidMount() {
        const { dispatch, topicId, data } = this.props;
        if (data) 
            dispatch(fetchTopicPreviewText({
                topicId,
                n: +data.n
            }));
    }

    componentWillReceiveProps(props: Props) {
        const { dispatch, topicId, data } = props;
        if (!data)
            return;

        let shouldFetch = false;
        if (!this.props.data)
            shouldFetch = true;
        else if (this.props.data.n !== data.n)    
            shouldFetch = true;

        if (shouldFetch) 
            dispatch(fetchTopicPreviewText({
                topicId,
                n: +data.n
            }));
    }

    onClickFirst = () => {
        const { dispatch, topicId, data } = this.props;
        if (data) 
            dispatch(fetchTopicPreviewText({
                topicId,
                n: 0
            }));
    }
    
    onClickNext = () => {
        const { dispatch, topicId, data } = this.props;
        if (data) 
            dispatch(fetchTopicPreviewText({
                topicId,
                n: +data.n+1
            }));
    }
    
    onClickPrev = () => {
        const { dispatch, topicId, data } = this.props;
        if (data && +data.n > 0) 
            dispatch(fetchTopicPreviewText({
                topicId,
                n: +data.n-1
            }));
    }

    render() {
        const { topicId, data } = this.props;
        if (data === undefined)
            return null;

        return (
            <div className="topic-preview">
                <PreviewHeader 
                    user={data.user}
                    utime={+data.utime}
                    topicId={topicId}
                    n={data.n}
                    onFirst={this.onClickFirst}
                    onLast={this.onClickFirst}
                    onNext={this.onClickNext}
                    onPrev={this.onClickPrev}
                />
                <MsgText 
                    data={data} 
                    html={data.text} 
                    topicId={topicId} 
                    style={{maxHeight: "500px", overflowY: "auto", overflowWrap: "break-word"}}
                />
            </div>
        )    
    }

}

export default connect()(TopicPreview);