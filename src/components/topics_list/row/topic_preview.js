//@flow
import React, { Component } from 'react'
import { connect } from 'react-redux'

type Props = {
    topicId: number,
    data?: {
        n: number,
        text: string
    }    
}

class TopicPreview extends Component<Props> {

    componentDidMount() {

    }

    render() {
        console.log(this.props);
        const { topicId, data } = this.props;
        if (data === undefined)
            return null;

        return (
            <div>
                <blockquote>
                <span className="plus-nav">[← </span>
                <span className="plus-nav" > « </span>
                <a className="plus-nav" title={`Перейти к сообщению ${data.n}`} href={`${window.hash}/topic.php?id=${topicId}#${data.n}`}>{data.n}</a>
                <span className="plus-nav"> » </span>
                <span className="plus-nav"> →]</span>
                <div>
                </div>
                </blockquote>
            </div>
        )    
    }

}

export default connect()(TopicPreview);