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
import type { TopicPreviewState } from 'src/reducers/topic_preview'

import { fetchTopicsListIfNeeded } from 'src/actions/topics_list'

import Title from './title'
import Header from './header'
import Row from './row'
import Pages from 'src/components/common/pages'
import NewTopic from './new_topic'

import TopicPreview from 'src/components/extensions/topic_preview'

type StateProps = {
    topicsList: TopicsListState,
    topicPreview: TopicPreviewState,
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

        const { topicsList, topicPreview, sections, options } = this.props;

        let rows = [];
        for (let i in topicsList.items) {
            
            const item = topicsList.items[i];
            rows.push(<Row key={i} data={item} columns={options.listColumns}/>);

            const previewItem = topicPreview.items[String(item.id)];
            if (previewItem)
                rows.push(<tr>
                    <td></td>
                    <td></td>
                    <td colspan="3">
                        <TopicPreview topicId={item.id} data={previewItem}/>
                    </td>
                    </tr>
                )
        }

        return (
            <div>
                {options.items.showTitle === 'true' ? (
                    <Title />
                    ) : null
                }
                <Header history={this.props.history} />
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
                        {rows}
                    </tbody>
                </table>
                <Pages baseUrl='index.php' locationParams={this.locationParams} maxPage={10}/>
                <NewTopic sections={sections.items} onPostSuccess={this.onPostNewTopicSuccess} locationParams={this.locationParams}/>
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