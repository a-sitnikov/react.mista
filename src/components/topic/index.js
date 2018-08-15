//@flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import queryString from 'query-string'
import { fetchTopicIfNeeded, fetchNewMessagesIfNeeded, closeTopic } from 'src/actions/topic'

import type { DefaultProps, Location } from 'src/components'
import type { ResponseInfo, ResponseMessage, ResponseMessages } from 'src/api'
import type { State } from 'src/reducers'
import type { LoginState } from 'src/reducers/login'
import { OptionsItems } from 'src/reducers/options'

import Pages from 'src/components/common/pages'
import Header from './header'
import TopicInfo from './topic_info'
import Row from './row'
import Footer from './footer'
import NewMessage from './new_message';
import { getMaxPage } from 'src/utils';

import  './topic.css'

type TopicLocationParams = {
    id: string,
    page?: string,
    hash?: string
}

type StateProps = {
    login: LoginState,
    info: ResponseInfo,
    item0?: ResponseMessage,
    items: ResponseMessages,
    error?: any,
    options: OptionsItems
}

type Props = {
    fetchTopicIfNeeded: any,
    fetchNewMessagesIfNeeded: any,
    closeTopic: any
} & DefaultProps & StateProps

class Topic extends Component<Props> {

    locationParams: TopicLocationParams;
    location: Location;
    timer;
    scrolledToHash: boolean;
    nodeF: any;

    constructor() {
        super();
        this.locationParams = {id: ''};
        this.scrolledToHash = false;
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

    componentDidUpdate() {
        const { location: {hash}, items } = this.props;
        if (!this.scrolledToHash && 
            hash &&
            items.length > 0){

            this.scrolledToHash = true;
            //window.scrollTo(0, this.nodeF.offsetTop);
            setTimeout(() => window.scrollTo(0, this.nodeF.offsetTop), 1);
        }
    }

    componentWillUnmount() {

        const { closeTopic } = this.props;

        clearInterval(this.timer);
        closeTopic();
    }

    componentWillReceiveProps(props: Props) {
        
        if (props.info.text && document.title !== props.info.text) {
            let title = props.info.text;
            title = title.replace(/&quot;/g, '"');
            
            document.title = title;
        }

        if (this.location.search !== props.location.search) {
            this.location = props.location;
            this.updateTopic();
            window.scrollTo(0, 0);
        }
    }
    
    autoUpdate = () => {
        const { info, fetchNewMessagesIfNeeded } = this.props;
        const isLastPage = (this.locationParams.page === 'last20' || this.locationParams.page === getMaxPage(+info.answers_count));

        if (isLastPage) 
            fetchNewMessagesIfNeeded({
                id: info.id,
                last: parseInt(info.answers_count, 10)
            })
    }

    updateTopic = () => {
       
        let { fetchTopicIfNeeded, item0 } = this.props;
        let locationParams = queryString.parse(this.location.search);

        if (!locationParams.page)
            locationParams.page = 1;

        else if (locationParams.page !== 'last20')  {
            locationParams.page = +locationParams.page;
            if (isNaN(locationParams.page))
                locationParams.page = 1;
        }  

        if (locationParams.id !== this.locationParams.id)
            item0 = null;

        this.locationParams = locationParams;
        fetchTopicIfNeeded(this.locationParams, item0);
    }

    onPostNewMessageSuccess = () => {

        const { fetchNewMessagesIfNeeded, info } = this.props;

        const isLastPage = (this.locationParams.page === 'last20' || this.locationParams.page === getMaxPage(+info.answers_count));

        if (isLastPage)
            fetchNewMessagesIfNeeded({
                id: info.id,
                last: parseInt(info.answers_count, 10)
            });

    }

    render() {
        const { login, items, item0, info, error } = this.props;

        let errorElem;
        if (error)
            errorElem = (
                <div >
                    <p className="error">ОШИБКА</p>
                    <p className="error">{error.message}</p>
                </div>
            )

        const maxPage = getMaxPage(+info.answers_count);

        return (
            <div style={{marginBottom: "5px"}}>
                {errorElem}
                <Header currentPage={this.locationParams.page} />
                <div className="topic-table">
                    <TopicInfo />
                    <Row key='0' data={item0}/>
                    {items.map((item, i) => (
                        <Row key={item.n} data={item}/>
                    ))}                
                    { (maxPage > 1 || this.locationParams.page === "last20") && 
                        <div className="tf">
                            <Pages baseUrl='topic.php' locationParams={this.locationParams} maxPage={maxPage} last20/>
                        </div>                    
                    }
                </div>
                <Footer params={this.locationParams} nodeRef={node => this.nodeF = node}/>
                {login.logged &&
                <NewMessage onSubmitSuccess={this.onPostNewMessageSuccess}/>
                }
            </div>
        )
    }
}

const mapStateToProps = (state: State): StateProps => {

    const {
        isFetching,
        lastUpdated,
        info,
        item0,
        items,
        error
    } = state.topic;

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
    fetchNewMessagesIfNeeded: (...params) => dispatch(fetchNewMessagesIfNeeded(...params)),
    closeTopic: (...params) => dispatch(closeTopic(...params))
})

export default connect(mapStateToProps, mapDispatchToProps)(Topic);