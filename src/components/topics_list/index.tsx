import React, { FC, ReactElement, useCallback, useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'

import { RootState, useAppDispatch } from 'src/data/store'
import { getTopicsListIfNeeded } from 'src/data/topicslist/actions'

import Header from './header'
import Row from './row'
import Pages from 'src/components/common/pages'
import NewTopic from './new_topic'
import Error from 'src/components/common/error'

import TopicPreview from 'src/components/preview/topic_preview'

import './topics_list.css'

const mapState = (state: RootState) => {

  return {
    topicsList: state.topicsList,
    sections: state.sections,
    login: state.login,
    options: state.options
  }
}

const connector = connect(mapState);
const TopicsList: FC<ConnectedProps<typeof connector>> = ({ topicsList, sections, login }): ReactElement => {

  const dispatch = useAppDispatch()
  const location = useLocation();
  const locationParams = queryString.parse(location.search);

  const updateTopicsList = useCallback((locationParams) => {
    dispatch(getTopicsListIfNeeded(locationParams));
  }, [dispatch])

  useEffect(() => {
    document.title = 'React.Mista';
  }, []);

  useEffect(() => {
    const locationParams = queryString.parse(location.search);
    updateTopicsList(locationParams);
  }, [location.search, updateTopicsList]);

  let rows = [];
  for (let item of topicsList.items) {

    rows.push(<Row key={item.id} data={item} topicId={item.id}/>);
    if (item.showPreview)
      rows.push(
        <TopicPreview 
          key={`preview${item.id}`} 
          topicId={item.id} 
          initialMsgNumber={item.previewMsgNumber}
          author={item.author}
          loggedUserId={login.userId}
          />
      )
  }

  return (
    <div>
      <Header />
      {topicsList.error && (<Error text={topicsList.error} />)}
      <div className="table">
        <div className="th" style={{ position: "sticky", top: "39px" }}>
          <div style={{ letterSpacing: "-1px" }}>Раздел</div>
          <div></div>
          <div>Тема</div>
          <div>Re</div>
          <div>Автор</div>
          <div><span style={{ cursor: "pointer" }} title="Обновить список" onClick={updateTopicsList}>{topicsList.isFetching ? "Обновляется" : "Обновлено"}</span></div>
        </div>
        {rows}
        <div className="tf">
          <Pages baseUrl='index.php' locationParams={locationParams} maxPage={10} />
        </div>
      </div>
      <div id="F" className="newtopic" style={{ marginBottom: "10px", marginTop: "5px", position: 'relative' }}>
        <NewTopic 
          onSubmitSuccess={updateTopicsList}
        />
      </div>
    </div>
  )
}

export default connector(TopicsList);