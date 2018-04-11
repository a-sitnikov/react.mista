//@flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import type { ResponseTopicsListItem } from '../../../api'
import type { State } from '../../../reducers'

import { defaultLoginState } from '../../../reducers/login'
import type { LoginState } from '../../../reducers/login'

import { defaultTopicPreviewState } from '../../../reducers/topic_preview'
import type { TopicPreviewState } from '../../../reducers/topic_preview'
import type { DefaultProps } from '../../index'

import Pages from './pages';
import PreviewLink from './preview_link'
import TopicPreview from './topic_preview'

type TopicNameCellProps = {
    column: any, 
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

        const { column, data, login, topicPreview } = this.props;

        let href = `${window.hash}/topic.php?id=${data.id}`;
        let classes = classNames('agb', {
            'longtopics': data.answ >= 100,
            'mytopics': data.user0 === login.username
        });

        let isVoting;
        if (data.is_voting === 1) {
            isVoting = <span className="agh separator">[±]</span>
        }

        let sectionHref = `${window.hash}/index.php?section=${data.sect2}`;
        let section = [];

        if (data.sect1) {
            section.push(<span key="0" className="agh" style={{ margin: "auto 2px auto 5px" }}>/</span>);
            section.push(<a key="1" rel="nofollow" className="sectionlink-gray" href={sectionHref} target="_blank">{data.sect1}</a>);
        }

        let closed;
        if (data.closed)
            closed = <span className="moder-action">Ø</span>

        if (data.sect2 === 'job' && data.text.substr(0, 3) !== 'JOB')
            data.text = 'JOB: ' + data.text;

        else if (data.forum === 'life' && data.text.substr(0, 3) !== 'OFF')
            data.text = 'OFF: ' + data.text;

        else if (data.sect2 === 'v7' && data.text.substr(0, 2) !== 'v7')
            data.text = 'v7: ' + data.text;

        let previewElem;
        const previewItem = topicPreview.items[String(data.id)];
        if (previewItem)
            previewElem = <TopicPreview topicId={data.id} data={previewItem}/>

        return (
            <td className={column.className}>
                <PreviewLink topicId={data.id} expanded={previewItem === undefined ? false: true}/>
                <a href={href} className={classes} style={{ marginRight: "5px", }} target="_blank" dangerouslySetInnerHTML={{ __html: data.text }}></a>
                {isVoting}
                <Pages answ={data.answ} topicId={data.id} />
                {closed}
                {section}
                {previewElem}
            </td>
        )

    }
}

const mapStateToProps = (state: State): StateProps => {

    return {
        login: state.login || defaultLoginState,
        topicPreview: state.topicPreview || defaultTopicPreviewState
    }
}

export default connect(mapStateToProps)(TopicNameCell);