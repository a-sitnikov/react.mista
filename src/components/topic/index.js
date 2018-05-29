//@flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import queryString from 'query-string'
import { fetchTopicIfNeeded, fetchNewMessagesIfNeeded } from 'src/actions/topic'

import type { DefaultProps, Location } from 'src/components'
import type { ResponseInfo, ResponseMessage, ResponseMessages } from 'src/api'
import type { State } from 'src/reducers'
import { defaultTopicState } from 'src/reducers/topic'
import { OptionsItems } from 'src/reducers/options'

import Header from './header'
import TopicInfo from './topic_info'
import Row from './row'
import Footer from './footer'
import NewMessage from './new_message';
import { getMaxPage } from 'src/utils';

type TopicLocationParams = {
    id: string,
    page?: string,
}

type Column = {
    name: string,
    width?: string
}

type TopicProps = {
    info: ResponseInfo,
    item0?: ResponseMessage,
    items: ResponseMessages,
    error?: any,
    options: OptionsItems
}

type Props = {
    fetchTopicIfNeeded: any,
    fetchNewMessagesIfNeeded: any
} & DefaultProps & TopicProps

class Topic extends Component<Props> {

    onPostNewMessageSuccess;
    updateTopic;
    autoUpdate;
    locationParams: TopicLocationParams;
    location: Location;
    columns: Array<Column>;
    timer;

    constructor(props) {
        super(props);
        this.onPostNewMessageSuccess = this.onPostNewMessageSuccess.bind(this);
        this.updateTopic = this.updateTopic.bind(this)
        this.autoUpdate = this.autoUpdate.bind(this)
        
        this.locationParams = {id: ''};
        
        this.columns = [
            { name: 'Автор', width: '165px' },
            { name: 'Текст' }
        ];
        
    }

    componentDidMount() {
        
        this.location = this.props.location;
        this.updateTopic();

        if (this.props.options.autoRefreshTopic === 'true') {
            
            let autoRefreshTopicInterval = +this.props.options.autoRefreshTopicInterval;
            if (autoRefreshTopicInterval < 60) autoRefreshTopicInterval = 60;

            this.timer = setInterval(this.autoUpdate, autoRefreshTopicInterval * 1000);
        }
        
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    componentWillReceiveProps(props: Props) {
        
        if (props.info.text && document.title !== props.info.text) {
            document.title = props.info.text;
        }

        if (this.location.search !== props.location.search) {
            this.location = props.location;
            this.updateTopic();
        }
    }
    
    autoUpdate() {
        const { info, fetchNewMessagesIfNeeded } = this.props;
        const isLastPage = (this.locationParams.page === 'last20' || this.locationParams.page === getMaxPage(parseInt(info.answers_count, 10)));

        if (isLastPage) 
            fetchNewMessagesIfNeeded({
                id: info.id,
                last: parseInt(info.answers_count, 10)
            })
    }

    updateTopic() {
       
        let { fetchTopicIfNeeded, item0 } = this.props;
        let locationParams = queryString.parse(this.location.search);
        locationParams.hash = this.location.hash;

        if (!locationParams.page)
            locationParams.page = 1;

        else if (locationParams.page !== 'last20')  {
            locationParams.page = parseInt(locationParams.page, 10);
            if (isNaN(locationParams.page))
                locationParams.page = 1;
        }  

        if (locationParams.id !== this.locationParams.id)
            item0 = null;

        this.locationParams = locationParams;
        fetchTopicIfNeeded(this.locationParams, item0);
    }

    onPostNewMessageSuccess() {

        const { fetchNewMessagesIfNeeded, info } = this.props;

        const isLastPage = (this.locationParams.page === 'last20' || this.locationParams.page === getMaxPage(parseInt(info.answers_count, 10)));

        if (isLastPage)
            fetchNewMessagesIfNeeded({
                id: info.id,
                last: parseInt(info.answers_count, 10)
            });

    }

    render() {
        const { items, item0, error } = this.props;

        let errorElem;
        if (error)
            errorElem = (
                <div >
                    <p className="error">ОШИБКА</p>
                    <p className="error">{error.message}</p>
                </div>
            )

        return (
            <div  >
                {errorElem}
                <Header currentPage={this.locationParams.page} />
                <table id='tm' className="border2" style={{ width: "100%", margin: "10px auto 0px auto" }}>
                    <colgroup>
                        {this.columns.map((item, i) => (
                            <col key={i} style={{ width: item.width }} />
                        ))}
                    </colgroup>
                    <tbody>
                        <TopicInfo />
                        <Row key='0' columns={this.columns} data={item0}/>
                        {items.map((item, i) => (
                            <Row key={item.n} columns={this.columns} data={item}/>
                        ))}
                    </tbody>
                </table>
                <Footer params={this.locationParams} />
                <NewMessage onPostSuccess={this.onPostNewMessageSuccess} />
            </div>
        )
    }
}

const mapStateToProps = (state: State): TopicProps => {

    const {
        isFetching,
        lastUpdated,
        info,
        item0,
        items,
        error
    } = state.topic || defaultTopicState;

    return {
        login: state.login,
        info,
        item0,
        items,
        isFetching,
        lastUpdated,
        error,
        options: state.options.items
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchTopicIfNeeded: (...params) => dispatch(fetchTopicIfNeeded(...params)),
    fetchNewMessagesIfNeeded: (...params) => dispatch(fetchNewMessagesIfNeeded(...params))   
})

export default connect(mapStateToProps, mapDispatchToProps)(Topic);