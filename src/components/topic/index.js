import React, { Component } from 'react'
import { connect } from 'react-redux'
import queryString from 'query-string'
import { fetchTopicIfNeeded, fetchNewMessagesIfNeeded } from '../../actions/topic'

import Header from './header'
import TopicInfo from './topic_info'
import Row from './row'
import Footer from './footer'
import NewMessage from './new_message';
import { maxPage } from '../../utils';

class Topic extends Component {

    constructor(props) {
        super(props);
        this.onPostNewMessageSuccess = this.onPostNewMessageSuccess.bind(this);
        this.updateTopic = this.updateTopic.bind(this);
        this.params = {};
    }

    componentDidMount() {

        const { dispatch } = this.props;

        this.location = this.props.location;
        this.updateTopic(dispatch);

    }

    componentWillReceiveProps(props) {
        
        if (props.info.text && document.title !== props.info.text) {
            document.title = props.info.text;
        }

        const { dispatch, location } = props;

        if (this.location.search !== location.search) {
            this.location = location;
            this.updateTopic(dispatch);
        }
    }

    updateTopic() {
       
        let { dispatch, item0 } = this.props;
        let params = queryString.parse(this.location.search);
        params.hash = this.location.hash;

        if (!params.page)
            params.page = 1;

        else if (params.page !== 'last20')  {
            params.page = parseInt(this.params.page, 10)
            if (isNaN(params.page))
                params.page  = 1;
        }  

        if (params.id !== this.params.id)
            item0 = undefined;

        this.params = params;
        dispatch(fetchTopicIfNeeded(this.params, item0));
    }

    onPostNewMessageSuccess() {

        const { dispatch, info } = this.props;

        const isLastPage = (this.params.page === 'last20' || this.params.page === maxPage(parseInt(info.answers_count, 10)));

        if (isLastPage)
            dispatch(fetchNewMessagesIfNeeded({
                id: info.id,
                last: parseInt(info.answers_count, 10)
            }));

    }

    render() {
        const { login, info, items, item0, bookmark, error } = this.props;

        let columns = [
            { name: 'Автор', width: '165px' },
            { name: 'Текст' }
        ];

        let newMessage;
        if (login.userid)
            newMessage = <NewMessage info={info} onPostSuccess={this.onPostNewMessageSuccess} />

        let errorElem;
        if (error)
            errorElem = (
                <div >
                    <p className="error">ОШИБКА</p>
                    <p className="error">{error.message}</p>
                </div>
            )

        let row0;
        if (item0)
            row0 =  <Row key={item0.n} columns={columns} k="2" data={item0} info={info} />    

        return (
            <div  >
                {errorElem}
                <Header info={info} currentPage={this.page} dispatch={this.props.dispatch} />
                <table id='table_messages' style={{ width: "100%", margin: "10px auto 0px auto" }}>
                    <colgroup>
                        {columns.map((item, i) => (
                            <col key={i} style={{ width: item.width }} />
                        ))}
                    </colgroup>
                    <tbody>
                        <TopicInfo info={info} />
                        {row0}
                        {items.map((item, i) => (
                            <Row key={item.n} columns={columns} k="2" data={item} info={info} />
                        ))}
                    </tbody>
                </table>
                <Footer info={info} dispatch={this.props.dispatch} params={this.params} bookmark={bookmark} />
                {newMessage}
            </div>
        )
    }
}

const mapStateToProps = state => {

    const {
        isFetching,
        lastUpdated,
        info,
        item0,
        items,
        error
    } = state.topic || {
        isFetching: true,
        info: {},
        item0: undefined,
        items: []
    }

    return {
        login: state.login,
        info,
        item0,
        items,
        isFetching,
        lastUpdated,
        bookmark: state.bookmark,
        error
    }
}

export default connect(mapStateToProps)(Topic);