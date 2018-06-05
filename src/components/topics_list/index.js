//@flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import queryString from 'query-string'

import type { State } from 'src/reducers'
import type { DefaultProps, Location } from 'src/components'

import type { TopicsListState } from 'src/reducers/topics_list'
import type { SectionsState } from 'src/reducers/sections'
import type { LoginState } from 'src/reducers/login'
import type { Column, OptionsState } from 'src/reducers/options'

import { fetchTopicsListIfNeeded } from 'src/actions/topics_list'

import Title from './title'
import Header from './header'
import SearchResults from './search_results'
import Row from './row'
import Footer from './footer'
import NewTopic from './new_topic'

type StateProps = {
    topicsList: TopicsListState,
    sections: SectionsState,
    login: LoginState,
    options: OptionsState,
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
    columns: Array<Column>;
    location: Location;
    locationParams: { page: string };
    page: string;
    timer: any;

    constructor(props: Props) {
        super(props);
        this.updateTopicsList = this.updateTopicsList.bind(this);
        this.onPostNewTopicSuccess = this.onPostNewTopicSuccess.bind(this);
        this.locationParams = { };
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

        const { topicsList, sections, options } = this.props;

        return (
            <div>
                {options.items.showTitle === 'true' ? (
                    <Title />
                    ) : null
                }
                <Header history={this.props.history} />
                <SearchResults />
                <table id='tm' className="border1">
                    <colgroup>
                        {options.listColumns.map((item, i) => (
                            <col key={i} className={item.className} style={{ width: item.width }} />
                        ))}
                    </colgroup>
                    <tbody>
                        <tr>
                            {options.listColumns.map((item, i) => {
                                if (item.name === 'Обновлено')
                                    return <th key={i}><a style={{cursor: "pointer"}} title="Обновить список" onClick={this.updateTopicsList}>{item.name}</a></th>
                                else 
                                    return <th key={i}>{item.name}</th>
                            })}
                        </tr>
                        {topicsList.items.map((item, i) => (
                            <Row key={i} data={item} columns={options.listColumns}/>
                        ))}
                    </tbody>
                </table>
                <Footer locationParams={this.locationParams}/>
                <NewTopic sections={sections.items} onPostSuccess={this.onPostNewTopicSuccess} locationParams={this.locationParams}/>
            </div>
        )
    }
}


const mapStateToProps = (state: State): StateProps => {

    return {
        topicsList: state.topicsList,
        sections: state.sections,
        login: state.login,
        options: state.options,
        topicsPerPage: state.options.items.topicsPerPage,
        autoRefreshTopicsList: state.options.items.autoRefreshTopicsList,
        autoRefreshTopicsListInterval: state.options.items.autoRefreshTopicsListInterval,
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchTopicsListIfNeeded: (...params) => dispatch(fetchTopicsListIfNeeded(...params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TopicsList);