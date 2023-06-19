import React, { FC, ReactElement } from 'react'
import { connect, ConnectedProps } from 'react-redux'

import { RootState } from 'src/store/store'

import { domain, urlTopicInfo, urlTopicMessages } from 'src/api'

const mapState = (state: RootState) => {

  const {
    info
  } = state.topic;

  return {
    info
  }
}
const connector = connect(mapState);
const TopicInfo: FC<ConnectedProps<typeof connector>> = ({ info }): ReactElement => {

  let yandexUrl = "https://www.yandex.ru/search/?text=" + encodeURIComponent(info.title);

  return (
    <div className="topic-row">
      <div className="cell-userinfo">
        <div className="topic-tools">
          <a title="API.info" href={`${domain}/${urlTopicInfo}?id=${info.id}`} className="agh" style={{ display: "block", lineHeight: "1em" }}>i</a>
          <a title="API.messages" href={`${domain}/${urlTopicMessages}?id=${info.id}&from=0&to=20`} className="agh" style={{ display: "block", lineHeight: "1em" }}>m</a>
          {/*<a href="add_voting.php?topic_id=815217" title="Добавить голосование">vote</a> &nbsp;&nbsp;*/}
        </div>
      </div>
      <div className="cell-message">
        <div className="flex-row">
          <div style={{ flex: 1, textAlign: "center" }}>
            <a href={`${domain}/topic.php?id=${info.id}`}>
              <h1 className="topic-title" dangerouslySetInnerHTML={{ __html: info.title }}></h1>
            </a>
            <div className="moder-action"></div>
          </div>
          <div style={{ flex: "0 0 20px", position: "relative" }}>
            <div className="div-va-middle">
              <a rel="noopener noreferrer" href={yandexUrl} title="Искать в Яндексе" target="_blank" className="yandex">Я</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}

export default connector(TopicInfo);