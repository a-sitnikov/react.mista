import React, { Component } from 'react'
import { connect } from 'react-redux'
import queryString from 'query-string'
import { fetchTopicIfNeeded } from '../../actions/topic'

import Header from './header'
import Row from './row'

class Topic extends Component {

    componentDidMount() {

        const { dispatch, location } = this.props;
        const queryParams = queryString.parse(location.search);

        dispatch(fetchTopicIfNeeded(queryParams));
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
                        <Header info={info}/>
                        {items.map((item, i) => (
                            <Row key={i} columns={columns} data={item} info={info}/>
                        ))}
                    </tbody>
                </table>
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