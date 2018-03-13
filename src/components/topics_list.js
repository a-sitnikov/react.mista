import React, { Component } from 'react'
import { connect } from 'react-redux'
import queryString from 'query-string'
import PropTypes from 'prop-types'
import { fetchTopicsListIfNeeded } from '../actions/topics_list'
import classNames from 'classnames'

const Row = (props) => {

    const { columns, data } = props;

    let cells = [];
    let i = 0;
    for (let column of columns) {

        let value;
        if (column.name === 'Раздел') {
            value = <td key={i} className={column.className}>{data.forum}</td>
        } else if (column.name === 'Re') {
            value = <td key={i} className={column.className}>{data.answ}</td>
        } else if (column.name === 'Тема') {
            let href = `topic.php?id=${data.id}`;
            let classes = classNames('agb', { 'longtopics': data.answ >= 100 });
            value =
                <td key={i} className={column.className}>
                    <a href={href} className={classes} target="_blank" dangerouslySetInnerHTML={{ __html: data.text }}></a>
                </td>
        } else if (column.name === 'Автор') {
            value = <td key={i} className={column.className}>{data.user0}</td>
        } else if (column.name === 'Обновлено') {
            value = <td key={i} className={column.className}>{data.user}</td>
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

class TopicsList extends Component {

    static propTypes = {
        items: PropTypes.array, //.isRequired,
        isFetching: PropTypes.bool, //.isRequired,
        lastUpdated: PropTypes.number,
        dispatch: PropTypes.func, //.isRequired
    }

    componentDidMount() {
        const { dispatch, location } = this.props
        const queryParams = queryString.parse(location.search);

        dispatch(fetchTopicsListIfNeeded(queryParams.page));
    }

    render() {
        let columns = [
            { name: 'Раздел', className: 'cc', width: '50px' },
            { name: 'Re', className: 'cc', width: '30px' },
            { name: 'Тема', className: 'ct' },
            { name: 'Автор', className: 'cl', width: '120px' },
            { name: 'Обновлено', className: 'cl', width: '150px' }
        ]

        const { items } = this.props;

        let pages = [];
        for (let i = 1; i <= 10; i++) {
            let href = `index.php?page=${i}`;
            pages.push(<a href={href} style={{margin: '5px'}}>{i}</a>);
        }

        return (
            <div>
                <table id='tm'>
                    <colgroup>
                        {columns.map((item, i) => (
                            <col key={i} className={item.className} style={{ width: item.width }} />
                        ))}
                    </colgroup>
                    <tbody>
                        <tr>
                            {columns.map((item, i) => (<th key={i}>{item.name}</th>))}
                        </tr>
                        {items.map((item, i) => (
                            <Row key={i} data={item} columns={columns} />
                        ))}
                    </tbody>
                    <tfoot>
                    </tfoot>
                </table>
                <table id='tf'>
                    <tr>
                        <td className="ta-left va-top" style={{ width: "25%" }}></td>
                        <td colspan={columns.length}>
                            <span className='pages'>
                                {pages}
                            </span>
                        </td>
                        <td className="ta-left va-top" style={{ width: "25%" }}></td>
                    </tr>
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
    } = state.topicsList || {
        isFetching: true,
        items: []
    }

    return {
        items,
        isFetching,
        lastUpdated
    }
}

export default connect(mapStateToProps)(TopicsList);