//@flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import dateFormat from 'dateformat'

import { fetchTopicPreviewText } from '../../../actions/topic_preview'

import MsgText from '../../topic/row/msg_text'
import type { DefaultProps } from '../../index'
import type { ResponseMessage } from '../../../api'

type TopicPreviewProps = {
    topicId: string,
    data?: ResponseMessage   
}

type Props = TopicPreviewProps & DefaultProps;

class TopicPreview extends Component<Props> {

    onClickNext;
    onClickPrev;
    onClickFirst;

    constructor(props) {
        super(props);
        this.onClickNext = this.onClickNext.bind(this);
        this.onClickPrev = this.onClickPrev.bind(this);
        this.onClickFirst = this.onClickFirst.bind(this);
    }

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

    onClickFirst() {
        const { dispatch, topicId, data } = this.props;
        if (data) 
            dispatch(fetchTopicPreviewText({
                topicId,
                n: 0
            }));
    }
    
    onClickNext() {
        const { dispatch, topicId, data } = this.props;
        if (data) 
            dispatch(fetchTopicPreviewText({
                topicId,
                n: +data.n+1
            }));
    }
    
    onClickPrev() {
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

        let n = data.n;
        let date = new Date(+data.utime*1000);

        return (
            <div>
                <blockquote>
                <span className="plus-nav" onClick={this.onClickFirst}>[← </span>
                <span className="plus-nav" onClick={this.onClickPrev}> « </span>
                <a className="plus-nav" title={`Перейти к сообщению ${n}`} href={`${window.hash}/topic.php?id=${topicId}#${n}`}>{n}</a>
                <span className="plus-nav" onClick={this.onClickNext}> » </span>
                <span className="plus-nav"> →]</span>
                <b style={{margin: "auto 5px"}}>{data.user}</b>
                <span className="agh">{dateFormat(date, 'dd.mm.yy - HH:MM')}</span>
                <MsgText data={data} topicId={topicId} style={{maxHeight: "500px", overflowY: "auto", overflowWrap: "break-word"}}/>
                </blockquote>
            </div>
        )    
    }

}

export default connect()(TopicPreview);