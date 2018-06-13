//@flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import type { ResponseTopicsListItem } from 'src/api'
import type { State } from 'src/reducers'

import type { LoginState } from 'src/reducers/login'
import type { DefaultProps } from 'src/components/index'
import type { TopicPreviewState } from 'src/reducers/topic_preview'

import Pages from './pages';

type TopicNameCellProps = {
    data: ResponseTopicsListItem,
    preview: ?number
};

type StateProps = {
    login: LoginState,
    topicPreview: TopicPreviewState
};

type Props = TopicNameCellProps & StateProps & DefaultProps;

class TopicNameCell extends Component<Props> {

    componentDidMount(){

    }

    render() {

        const { data, login } = this.props;

        let href = `${window.hash}/topic.php?id=${data.id}`;
        let classes = classNames('agb', 'mr5', {
            'bold': data.answ >= 100,
            'mytopics': data.user0 === login.username
        });

        let isVoting;
        if (data.is_voting === 1) {
            isVoting = <span className="agh separator">[±]</span>
        }

        let sectionHref = `${window.hash}/index.php?section=${data.sect2}`;
        let section;

        if (data.sect1) {
            section = (
            <span className="topic-section">
                <span className="agh" style={{margin: "0px 5px"}}>/</span>
                <a key="1" rel="nofollow" className="agh" href={sectionHref} target="_blank">{data.sect1}</a>
            </span>    
            )
        }

        let closed;
        let text = data.text;
        if (data.closed)
            closed = <span className="agh">Ø</span>

        if (data.sect2 === 'job' && text.substr(0, 3) !== 'JOB')
            text = 'JOB: ' + text;

        else if (data.forum === 'life' && text.substr(0, 3) !== 'OFF')
            text = 'OFF: ' + text;

        else if (data.sect2 === 'v7' && text.substr(0, 2) !== 'v7')
            text = 'v7: ' + text;

        return (
            <div className="cell-title">
                <a href={href} className={classes} target="_blank" dangerouslySetInnerHTML={{ __html: text }}></a>
                {isVoting}
                <Pages answ={data.answ} topicId={data.id} />
                {closed}
                {section}
            </div>
        )

    }
}

const mapStateToProps = (state: State): StateProps => {

    return {
        login: state.login,
        topicPreview: state.topicPreview
    }
}

export default connect(mapStateToProps)(TopicNameCell);