import React, { Component } from 'react'
import { connect } from 'react-redux'
import queryString from 'query-string'
import { fetchTopicIfNeeded } from '../../actions/topic'
import Row from './row'

class Topic extends Component {

    componentDidMount() {

        const { dispatch, location } = this.props;
        const queryParams = queryString.parse(location.search);

        dispatch(fetchTopicIfNeeded(queryParams.id));
    }

    render() {
        let columns = [
            { name: 'Автор', width: '120px' },
            { name: 'Текст' }
        ];

        const { items } = this.props;
        return (
            <div>
                <table id='table_messages'>
                    <colgroup>
                        {columns.map((item, i) => (
                            <col key={i} style={{ width: item.width }} />
                        ))}
                    </colgroup>
                    <tbody>
                        <tr>
                        </tr>
                        {items.map((item, i) => (
                            <Row key={i} columns={columns} data={item} />
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
        items
    } = state.topic || {
        isFetching: true,
        items: []
    }

    return {
        items,
        isFetching,
        lastUpdated
    }
}

export default connect(mapStateToProps)(Topic);