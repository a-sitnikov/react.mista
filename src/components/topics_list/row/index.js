//@flow
import React from 'react'
import { connect } from 'react-redux'
import dateFormat from 'dateformat'

import TopicNameCell from './topic_name_cell';
import LinkToPost from 'src/components/extensions/link_to_post'
import PreviewLink from './preview_link'

import { today } from 'src/utils'

import type { ResponseTopicsListItem } from 'srcapi'

import type { State } from 'src/reducers'

import type { LoginState } from 'src/reducers/login'
import type { TopicPreviewState } from 'src/reducers/topic_preview'
import type { DefaultProps } from 'src/components/index'

type RowProps = {
    columns: any,
    data: ResponseTopicsListItem
}

type StateProps = {
    login: LoginState,
    topicPreview: TopicPreviewState,
    showTooltipOnTopicsList: string
}

type Props = RowProps & StateProps & DefaultProps;

const Row = (props: Props) => {

    const { data, topicPreview, showTooltipOnTopicsList } = props;
    let time = new Date(data.utime * 1000);
    if (today(time)) {
        time = dateFormat(time, 'HH:MM')
    } else {
        time = dateFormat(time, 'dd.mm.yy');
    }

    const previewItem = topicPreview.items[String(data.id)];

    return (
        <div className="topics-list-row">
            {/*{cells}*/}
            <div className="cell-forum">
                {data.forum}
            </div>
            <div className="cell-section">
                {data.sect1}
            </div>
            <div className="cell-answ">
                { showTooltipOnTopicsList === 'true' ?
                    <LinkToPost topicId={data.id} number={data.answ} style={{color: "black"}} isPreview/>
                    :
                    data.answ
                }
            </div>
            <PreviewLink topicId={data.id} expanded={previewItem === undefined ? false: true}/>
            <TopicNameCell data={data}/>
            <div className="cell-author">
                {data.user0}
            </div>
            <div className="cell-lastuser">
                <div style={{display: "flex"}}>
                    <span className="cell-lastuser-time">{time}</span>
                    <span className="cell-lastuser-user">{data.user}</span>
                </div>
            </div>
            <div className="cell-last20">
                <a href={`${window.hash}/topic.php?id=${data.id}&page=last20`} style={{color: "inherit", display: "block", width: "100%", textAlign: "center"}}>{'>'}</a>
            </div>
        </div>
    )

}

const mapStateToProps = (state: State): StateProps => {

    return {
        login: state.login,
        topicPreview: state.topicPreview,
        showTooltipOnTopicsList: state.options.items.showTooltipOnTopicsList
    }
}

export default connect(mapStateToProps)(Row);