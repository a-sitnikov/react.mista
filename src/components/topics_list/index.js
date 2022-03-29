import React, { Component, useEffect } from 'react'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'

import type { State } from 'src/reducers'
import type { DefaultProps, Location } from 'src/components'

import type { TopicsListState } from 'src/data/topicslist/reducer'
import type { SectionsState } from 'src/data/sections/reducer'
import type { LoginState } from 'src/data/login/reducer'

import { useAppDispatch } from 'src/data/store'
import { getTopicsListIfNeeded } from 'src/data/topicslist/actions'

import Header from './header'
import Row from './row'
import Pages from 'src/components/common/pages'
import NewTopic from './new_topic'
import Error from 'src/components/common/error'

import TopicPreview from 'src/components/preview/topic_preview'

import './topics_list.css'

type StateProps = {
  topicsList: TopicsListState,
  sections: SectionsState,
  login: LoginState,
  topicsPerPage: string,
  autoRefreshTopicsList: string,
  autoRefreshTopicsListInterval: string
}

type Props = {
  fetchTopicsListIfNeeded: any
} & DefaultProps & StateProps;

const TopicsList = (props) => {

  const dispatch = useAppDispatch()
  const location = useLocation();
  const locationParams = queryString.parse(location.search);

  const updateTopicsList = () => {
    dispatch(getTopicsListIfNeeded(locationParams));
  }

  useEffect(() => {
    document.title = 'React.Mista';
  }, []);

  useEffect(() => {
    updateTopicsList();
  }, [location.search]);

  const { topicsList, sections } = props;

  let rows = [];
  for (let item of topicsList.items) {

    rows.push(<Row key={item.id} data={item} />);
    if (item.showPreview)
      rows.push(
        <div key={`preview${String(item.id)}`} className="preview-container">
          <TopicPreview topicId={String(item.id)} n={0} />
        </div>
      )
  }

  return (
    <div>
      <Header />
      {topicsList.error && (<Error text={topicsList.error} />)}
      <div className="table">
        <div className="th" style={{ position: "sticky", top: "39px" }}>
          <div style={{ letterSpacing: "-1px" }}>Раздел</div>
          <div>Re</div>
          <div></div>
          <div>Тема</div>
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
          sections={sections.items} 
          locationParams={locationParams} 
          onSubmitSuccess={updateTopicsList}
          />
      </div>
    </div>
  )
}

const mapStateToProps = (state: State): StateProps => {

  return {
    topicsList: state.topicsList,
    sections: state.sections,
    login: state.login,
    topicsPerPage: state.options.items.topicsPerPage,
    autoRefreshTopicsList: state.options.items.autoRefreshTopicsList,
    autoRefreshTopicsListInterval: state.options.items.autoRefreshTopicsListInterval,
  }
}

const mapDispatchToProps = (dispatch) => ({
  getTopicsListIfNeeded: (...params) => dispatch(getTopicsListIfNeeded(...params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TopicsList);