import React, { Component } from 'react'
import { connect } from 'react-redux'
import queryString from 'query-string'
import { fetchTopicIfNeeded } from '../actions/topic'
import { utimeToDate } from '../utils'

const Row = (props) => {

    const { columns, data } = props;

    let cells = [];
    let i = 0;
    for (let column of columns) {

        let value;
        if (column.name === 'Автор') {
            const href = `users.php?id=${data.id}`;
            value =
                <td className="bottomwhite ta-right va-top">
                    <a data-user_id={data.id} data-user_name={data.user} className="registered-user" href={href}>{data.user}</a>
                    <div class="message-info">
                        <button class="sendbutton">{utimeToDate(data.utime)}</button>
                    </div>
                </td>
        } else if (column.name === 'Текст') {
            value =
                <td key={i} className="leftbottomgray va-top ">
                    <div className="message-text" dangerouslySetInnerHTML={{ __html: data.text}}>
                    </div>
                </td>
        }

        cells.push(value);
        i++;

    }

    return (
        <tr>
            {cells}
        </tr>
    )

}

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