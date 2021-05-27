//@flow
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import dateFormat from 'dateformat'

import './topic_preview.css'

type TopicPreviewProps = {
    user: ?string,
    utime: ?number,
    topicId: string,
    n: number,
    onFirst: any,   
    onLast: any,   
    onPrev: any,   
    onNext: any
}

class PreviewHeader extends Component<TopicPreviewProps> {

    render() {
        const { user, utime, topicId, n } = this.props;

        if (utime)
            var date = new Date(utime*1000);

        return (
            <div>
                <span className="plus-nav" onClick={this.props.onFirst}>[← </span>
                <span className="plus-nav" onClick={this.props.onPrev}> « </span>
                <Link className="plus-nav" title={`Перейти к сообщению ${n}`} to={`/topic.php?id=${topicId}#${n}`}>{n}</Link>
                <span className="plus-nav" onClick={this.props.onNext}> » </span>
                <span className="plus-nav" onClick={this.props.onLast}> →]</span>
                <b style={{margin: "auto 5px"}}>{user}</b>
                <span className="agh">{dateFormat(date, 'dd.mm.yy - HH:MM')}</span>
            </div>
        )    
    }

}

export default ( PreviewHeader: any );