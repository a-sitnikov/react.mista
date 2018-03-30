import React, { Component } from 'react'
import { connect } from 'react-redux'

class TopicInfo extends Component {

    render() {

        const { info } = this.props;

        let yandexUrl = "https://www.yandex.ru/yandsearch?rpt=rad&text=" + encodeURIComponent(info.text);

        return (
            <tr>
                <td id="topic-moder-tools">
                    <div className="moder-action">
                        <div>
                            {/*<a href="add_voting.php?topic_id=815217" title="Добавить голосование">vote</a> &nbsp;&nbsp;*/}
                        </div>
                    </div>
                </td>
                <td className="leftbottomgray ta-center" style={{ backgroundColor: "#FDFDFD" }}>
                    <div className="flex-row">
                        <div id="td_topic_text" style={{ flex: 1 }}>
                            <h1 className="topic-title " dangerouslySetInnerHTML={{ __html: info.text }}></h1>
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

const mapStateToProps = state => {

    const {
        info
    } = state.topic || {
        info: {}
    }

    return {
        info
    }
}

export default connect(mapStateToProps)(TopicInfo);