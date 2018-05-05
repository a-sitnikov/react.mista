//@flow
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { defaultTopicState } from 'src/reducers/topic'

import type { State } from 'src/reducers'
import type { ResponseInfo } from 'src/api'
import { domain, urlTopicInfo, urlTopicMessages} from 'src/api'

import './topic_info.css'

type StateProps = {
    info: ResponseInfo
}

class TopicInfo extends Component<StateProps> {

    render() {

        const { info } = this.props;

        let yandexUrl = "https://www.yandex.ru/yandsearch?rpt=rad&text=" + encodeURIComponent(info.text);

        return (
            <tr>
                <td id="topic-moder-tools">
                    <div className="moder-action">
                        <div>
                            <a title="API.info" href={`${domain}/${urlTopicInfo}?id=${info.id}`} className="agh" style={{display: "block", lineHeight: "1em"}}>i</a>
                            <a title="API.messages" href={`${domain}/${urlTopicMessages}?id=${info.id}&from=0&to=20`} className="agh" style={{display: "block", lineHeight: "1em"}}>m</a>
                            {/*<a href="add_voting.php?topic_id=815217" title="Добавить голосование">vote</a> &nbsp;&nbsp;*/}
                        </div>
                    </div>
                </td>
                <td className="leftbottomgray ta-center" style={{ backgroundColor: "#FDFDFD" }}>
                    <div className="flex-row">
                        <div id="td_topic_text" style={{ flex: 1 }}>
                            <a href={`https://www.forum.mista.ru/topic.php?id=${info.id}`}>
                                <h1 className="topic-title " dangerouslySetInnerHTML={{ __html: info.text }}></h1>
                            </a>
                            <div className="moder-action"></div>
                        </div>
                        <div style={{ flex: "0 0 20px", position: "relative" }}>
                            <div className="div-va-middle">
                                <a rel="nofollow" href={yandexUrl} title="Искать в Яндексе" target="_blank" className="yandex">Я</a>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        )
    }
}

const mapStateToProps = (state: State): StateProps => {

    const {
        info
    } = state.topic || defaultTopicState;

    return {
        info
    }
}

export default connect(mapStateToProps)(TopicInfo);