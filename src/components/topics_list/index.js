import React, { Component, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'

import type { State } from 'src/reducers'
import type { DefaultProps, Location } from 'src/components'

import type { TopicsListState } from 'src/data/topicslist/reducer'
import type { SectionsState } from 'src/data/sections/reducer'
import type { LoginState } from 'src/reducers/login'

import { fetchTopicsListIfNeeded } from 'src/data/topicslist/actions'

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

  const dispatch = useDispatch()
  const location = useLocation();
  const locationParams = queryString.parse(location.search);

  const updateTopicsList = () => {
    dispatch(fetchTopicsListIfNeeded(locationParams));
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

class TopicsList1 extends Component<Props> {

  location: Location;
  locationParams: { page?: string };
  page: string;
  timer: any;

  constructor(props: Props) {
    super(props);
    this.locationParams = { page: '1' };
  }

  componentDidMount() {

    this.location = window.location.hash.substring(2);
    console.log(window.location.hash);
    this.updateTopicsList();

  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  componentDidUpdate() {

    const { location, topicsPerPage } = this.props;

    if (this.location.search !== location.search
      || this.props.topicsPerPage !== topicsPerPage) {

      this.location = location;
      this.updateTopicsList();
      window.scrollTo(0, 0);
    }

    document.title = 'React.Mista';
  }

  updateTopicsList = () => {

    const { fetchTopicsListIfNeeded } = this.props;
    let { autoRefreshTopicsList, autoRefreshTopicsListInterval } = this.props;

    //this.locationParams = queryString.parse(this.location.search);
    fetchTopicsListIfNeeded(this.locationParams);

    if (autoRefreshTopicsList === 'true') {

      autoRefreshTopicsListInterval = +autoRefreshTopicsListInterval;
      if (autoRefreshTopicsListInterval < 60) autoRefreshTopicsListInterval = 60;

      clearTimeout(this.timer);
      this.timer = setTimeout(this.updateTopicsList, autoRefreshTopicsListInterval * 1000);
    }
  }

  onPostNewTopicSuccess = () => {
    this.updateTopicsList();
  }

  render() {

    const { topicsList, sections } = this.props;

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
        <Header history={this.props.history} />
        {topicsList.error && (<Error text={topicsList.error} />)}
        <div className="table">
          <div className="th" style={{ position: "sticky", top: "39px" }}>
            <div style={{ letterSpacing: "-1px" }}>Раздел</div>
            <div>Re</div>
            <div></div>
            <div>Тема</div>
            <div>Автор</div>
            <div><span style={{ cursor: "pointer" }} title="Обновить список" onClick={this.updateTopicsList}>{topicsList.isFetching ? "Обновляется" : "Обновлено"}</span></div>
          </div>
          {rows}
          <div className="tf">
            <Pages baseUrl='index.php' locationParams={this.locationParams} maxPage={10} />
          </div>
        </div>
        <div id="F" className="newtopic" style={{ marginBottom: "10px", marginTop: "5px", position: 'relative' }}>
          <NewTopic sections={sections.items} onSubmitSuccess={this.onPostNewTopicSuccess} locationParams={this.locationParams} />
        </div>
      </div>
    )
  }
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
  fetchTopicsListIfNeeded: (...params) => dispatch(fetchTopicsListIfNeeded(...params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TopicsList);