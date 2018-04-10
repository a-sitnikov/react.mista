//@flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import queryString from 'query-string'

import type { State } from '../../reducers'
import type { DefaultProps, Location } from '../../components'

import { defaultTopicsListState } from '../../reducers/topics_list'
import { fetchTopicsListIfNeeded } from '../../actions/topics_list'

import Title from './title'
import Header from './header'
import SearchResults from './search_results'
import Row from './row'
import Footer from './footer'
import NewTopic from './new_topic'

type TopicsListProps = {
    topicsList: any,
    sections: any,
    login: any
}

type Props = {
    fetchTopicsListIfNeeded: any
} & DefaultProps & TopicsListProps;

type Column = {
    name: string,
    className?: string,
    width?: string
}

class TopicsList extends Component<Props> {
    
    updateTopicsList: () => void;
    columns: Array<Column>;
    location: Location;
    page: string;

    constructor(props: Props) {
        super(props);
        this.updateTopicsList = this.updateTopicsList.bind(this);
        this.columns = [
            { name: 'Раздел', className: 'cc', width: '50px' },
            { name: 'Re', className: 'cc', width: '30px' },
            { name: 'Тема', className: 'ct' },
            { name: 'Автор', className: 'cl', width: '120px' },
            { name: 'Обновлено', className: 'cl', width: '150px' }
        ]
    }

    componentDidMount() {
        this.location = this.props.location;
        this.updateTopicsList();
    }

    componentWillReceiveProps(props: Props) {
        const { location } = props;

        if (this.location.search !== location.search) {
            this.location = location;
            this.updateTopicsList();
        }
    }

    updateTopicsList() {
        
        const { fetchTopicsListIfNeeded } = this.props;       

        const locationParams = queryString.parse(this.location.search);
        fetchTopicsListIfNeeded(locationParams);
    }

    sendNewTopic(e, text) {

    }

    render() {

        const { topicsList, sections } = this.props;

        return (
            <div>
                <Title />
                <Header history={this.props.history} />
                <SearchResults />
                <table id='tm' style={{width: "100%", margin: "10px auto 0px auto"}}>
                    <colgroup>
                        {this.columns.map((item, i) => (
                            <col key={i} className={item.className} style={{ width: item.width }} />
                        ))}
                    </colgroup>
                    <tbody>
                        <tr>
                            {this.columns.map((item, i) => (<th key={i}>{item.name}</th>))}
                        </tr>
                        {topicsList.items.map((item, i) => (
                            <Row key={i} data={item} columns={this.columns} preview={topicsList.previewItems[item.id]}/>
                        ))}
                    </tbody>
                    <tfoot>
                    </tfoot>
                </table>
                <Footer page={this.page} />
                <br />
                <NewTopic sections={sections.items} onSend={this.sendNewTopic}/>
            </div>
        )
    }
}


const mapStateToProps = (state: State): TopicsListProps => {

    return {
        topicsList: state.topicsList || defaultTopicsListState,
        sections: state.sections || { items: [] },
        login: state.login || {}
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchTopicsListIfNeeded: (...params) => dispatch(fetchTopicsListIfNeeded(...params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TopicsList);