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
import Error from 'src/components/common/error'

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
    
    location: Location;
    locationParams: { page?: string };
    page: string;
    timer: any;

    constructor(props: Props) {
        super(props);
        this.locationParams = { page: '1' };
    }

    componentDidMount() {

        let { location } = this.props;

        this.location = location;
        this.updateTopicsList();
        
    }
    
    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    componentWillReceiveProps(props: Props) {
        
        const { location, topicsPerPage } = props;

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

        this.locationParams = queryString.parse(this.location.search);
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

        const { topicsList, topicPreview, sections } = this.props;

        let rows = [];
        for (let i in topicsList.items) {
            
            const item = topicsList.items[i];
            rows.push(<Row key={item.id} data={item}/>);

            const previewItem = topicPreview.items[String(item.id)];
            if (previewItem)
                rows.push(
                    <div key={`preview${item.id}`} className="preview-container">
                        <TopicPreview topicId={item.id} data={previewItem}/>
                    </div>
                )
        }

        return (
            <div>
                <Header history={this.props.history} />
                {topicsList.error && (<Error text={topicsList.error} />)}
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
                    <NewTopic sections={sections.items} onSubmitSuccess={this.onPostNewTopicSuccess} locationParams={this.locationParams}/>
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