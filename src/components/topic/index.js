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
    }

    componentDidMount() {

        const { dispatch, location } = this.props;
        this.params = queryString.parse(location.search);
        this.params.hash = location.hash;
        
        this.page = +this.params.page || 1;
        this.params.page = this.page;

        dispatch(fetchTopicIfNeeded(this.params));

    }

    componentWillReceiveProps(props) {
        if (props.info.text && document.title !== props.info.text) {
            document.title = props.info.text;
        }
    }

    onPostNewMessageSuccess() {

        const { dispatch, info } = this.props;

        const isLastPage = (this.page === maxPage(parseInt(info.answers_count, 10)));

        if (isLastPage) 
            dispatch(fetchNewMessagesIfNeeded({
                id: info.id,
                last: parseInt(info.answers_count, 10)
            }));

    }

    render() {
        const { login, info, items, bookmark, error } = this.props;
        
        let columns = [
            { name: 'Автор', width: '165px' },
            { name: 'Текст' }
        ];

        let newMessage;
        if (login.userid)
            newMessage = <NewMessage info={info} onPostSuccess={this.onPostNewMessageSuccess}/>

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
                <Header info={info} currentPage={this.page} dispatch={this.props.dispatch}/>
                <table id='table_messages' style={{width: "100%", margin: "10px auto 0px auto"}}>
                    <colgroup>
                        {columns.map((item, i) => (
                            <col key={i} style={{ width: item.width }} />
                        ))}
                    </colgroup>
                    <tbody>
                        <TopicInfo info={info}/>
                        {items.map((item, i) => (
                            <Row key={item.n} columns={columns} k="2" data={item} info={info}/>
                        ))}
                    </tbody>
                </table>
                <Footer info={info} currentPage={this.page} dispatch={this.props.dispatch} params={this.params} bookmark={bookmark}/>
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
        items,
        error
    } = state.topic || {
        isFetching: true,
        info: {},
        items: []
    }

    return {
        login: state.login,
        info,
        items,
        isFetching,
        lastUpdated,
        bookmark: state.bookmark,
        error
    }
}

export default connect(mapStateToProps)(Topic);