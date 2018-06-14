//@flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import queryString from 'query-string'

import type { State } from 'src/reducers'
import type { DefaultProps, Location } from 'src/components'

import type { TopicsListState } from 'src/reducers/topics_list'
import type { SectionsState } from 'src/reducers/sections'
import type { LoginState } from 'src/reducers/login'
import type { TopicPreviewState } from 'src/reducers/topic_preview'

import { fetchTopicsListIfNeeded } from 'src/actions/topics_list'

import Header from './header'
import Row from './row'
import Pages from 'src/components/common/pages'
import NewTopic from './new_topic'

import TopicPreview from 'src/components/extensions/topic_preview'

import './topics_list.css'

type StateProps = {
    topicsList: TopicsListState,
    topicPreview: TopicPreviewState,
    sections: SectionsState,
    login: LoginState,
    topicsPerPage: string,
    autoRefreshTopicsList: string,
    autoRefreshTopicsListInterval: string
}

type Props = {
    fetchTopicsListIfNeeded: any
} & DefaultProps & StateProps;

class TopicsList extends Component<Props> {
    
    updateTopicsList: () => void;
    onPostNewTopicSuccess: () => void;
    location: Location;
    locationParams: { page?: string };
    page: string;
    timer: any;

    constructor(props: Props) {
        super(props);
        this.updateTopicsList = this.updateTopicsList.bind(this);
        this.onPostNewTopicSuccess = this.onPostNewTopicSuccess.bind(this);
        this.locationParams = { page: '1' };
    }

    componentDidMount() {

        let { location, autoRefreshTopicsList, autoRefreshTopicsListInterval } = this.props;

        this.location = location;
        this.updateTopicsList();
        
        if (autoRefreshTopicsList === 'true') {
            
            autoRefreshTopicsListInterval = +autoRefreshTopicsListInterval;
            if (autoRefreshTopicsListInterval < 60) autoRefreshTopicsListInterval = 60;

            this.timer = setInterval(this.updateTopicsList, autoRefreshTopicsListInterval * 1000);
        }
        
    }
    
    componentWillUnmount() {
        clearInterval(this.timer);
    }

    componentWillReceiveProps(props: Props) {
        
        const { location, topicsPerPage } = props;

        if (this.location.search !== location.search 
            || this.props.topicsPerPage !== topicsPerPage) {

            this.location = location;
            this.updateTopicsList();
        }
    }

    updateTopicsList() {
        
        const { fetchTopicsListIfNeeded } = this.props;       

        this.locationParams = queryString.parse(this.location.search);
        fetchTopicsListIfNeeded(this.locationParams);
    }

    onPostNewTopicSuccess() {
        this.updateTopicsList();
    }

    render() {

        const { topicsList, topicPreview, sections } = this.props;

        let rows = [];
        for (let i in topicsList.items) {
            
            const item = topicsList.items[i];
            rows.push(<Row key={i} data={item}/>);

            const previewItem = topicPreview.items[String(item.id)];
            if (previewItem)
                rows.push(
                    <div key={`preview${i}`} className="preview-container">
                        <TopicPreview topicId={item.id} data={previewItem}/>
                    </div>
                )
        }

        return (
            <div>
                <Header history={this.props.history} />
                <div className="table">
                    <div className="th">
                        <div>Раздел</div>
                        <div>Re</div>
                        <div></div>
                        <div>Тема</div>
                        <div>Автор</div>
                        <div><a style={{cursor: "pointer"}} title="Обновить список" onClick={this.updateTopicsList}>{topicsList.isFetching ? "Обновляется" : "Обновлено"}</a></div>
                    </div>
                    {rows}
                    <div className="tf">
                        <Pages baseUrl='index.php' locationParams={this.locationParams} maxPage={10}/>
                    </div>    
                </div>
                <div id="F" className="newtopic" style={{ marginBottom: "10px", marginTop: "5px", position: 'relative' }}>
                    <NewTopic sections={sections.items} onPostSuccess={this.onPostNewTopicSuccess} locationParams={this.locationParams}/>
                </div>    
            </div>
        )
    }
}


const mapStateToProps = (state: State): StateProps => {

    return {
        topicsList: state.topicsList,
        topicPreview: state.topicPreview,
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