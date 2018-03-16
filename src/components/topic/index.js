import React, { Component } from 'react'
import { connect } from 'react-redux'
import queryString from 'query-string'
import { fetchTopicIfNeeded } from '../../actions/topic'

import TopicHeader from './topic_header'
import Row from './row'
import Footer from './footer'
import NewMessage from './new_message';

class Topic extends Component {

    componentDidMount() {

        const { dispatch, location } = this.props;
        this.params = queryString.parse(location.search);
        this.params.hash = location.hash;
        
        this.page = +this.params.page || 1;
        this.params.page = this.page;

        dispatch(fetchTopicIfNeeded(this.params));
    }

    render() {
        let columns = [
            { name: 'Автор', width: '165px' },
            { name: 'Текст' }
        ];

        const { info, items } = this.props;
        return (
            <div>
                <table id='table_messages'>
                    <colgroup>
                        {columns.map((item, i) => (
                            <col key={i} style={{ width: item.width }} />
                        ))}
                    </colgroup>
                    <tbody>
                        <TopicHeader info={info}/>
                        {items.map((item, i) => (
                            <Row key={i} columns={columns} data={item} info={info}/>
                        ))}
                    </tbody>
                </table>
                <Footer info={info} currentPage={this.page} dispatch={this.props.dispatch} params={this.params}/>
                <NewMessage />
            </div>
        )
    }
}
const mapStateToProps = state => {

    const {
        isFetching,
        lastUpdated,
        info,
        items
    } = state.topic || {
        isFetching: true,
        info: {},
        items: []
    }

    return {
        info,
        items,
        isFetching,
        lastUpdated
    }
}

export default connect(mapStateToProps)(Topic);