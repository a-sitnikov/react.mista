//@flow
import React, { Component } from 'react'

import { fetchTopicMessage } from 'src/api/topicMessages'

import MsgText from 'src/components/topic/row/msg_text'

import PreviewHeader from './preview_header'
import './topic_preview.css'

type TopicPreviewProps = {
    topicId: string,
    n: number   
}

type Props = TopicPreviewProps;
type State = {
    n: number,
    data: ?any,
    error: ?string    
}

class TopicPreview extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            n: props.n,
            data: null,
            error: null
        }
    }

    async componentDidMount() {
        await this.fetchData(this.state.n);
    }

    fetchData = async (n: number) => {
        let data, error;
        try {
            data = await fetchTopicMessage(this.props.topicId, n);
            if (!data)
                error = `Сообщение не найдено ${n}`;

        } catch(e) {
            error = e.message
        };
        this.setState({
            n,
            data,
            error
        })
    }

    onClickFirst = () => {
        this.fetchData(0);
    }
    
    onClickNext = () => {
        this.fetchData(this.state.n + 1);
    }

    onClickPrev = () => {
        if (this.state.n > 0)
            this.fetchData(this.state.n - 1);
    }

    onClickLast = async () => {
        const n = await API.getTopicMessagesCount(this.props.topicId);
        this.fetchData(n);
    }

    render() {
        const { topicId } = this.props;
        const { data, error, n } = this.state;
        if (!data && !error)
            return null;

        if (data)
            var { user, utime } = data;

        return (
            <div className="topic-preview">
                <PreviewHeader 
                    user={user}
                    utime={+utime}
                    topicId={topicId}
                    n={n}
                    onFirst={this.onClickFirst}
                    onLast={this.onClickLast}
                    onNext={this.onClickNext}
                    onPrev={this.onClickPrev}
                />
                {data && <MsgText 
                    data={data} 
                    html={data.text} 
                    topicId={topicId} 
                    style={{maxHeight: "500px", overflowY: "auto", overflowWrap: "break-word"}}
                />}
                {error && <p>{error}</p>}
            </div>
        )    
    }

}

export default ( TopicPreview: any );