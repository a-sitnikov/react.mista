import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchTopicsListIfNeeded } from '../actions/topics_list'

class Row extends Component {
    static propTypes = {
        columns: PropTypes.array, //.isRequired,
        data: PropTypes.object //.isRequired,
    }

    render() {
        
        const { columns, data } = this.props;

        let cells = [];
        let i=0;
        for (let column of columns) {
            
            let value;
            if (column.name === 'Раздел') {
                value = <td key={i}>{data.forum}</td>
            } else if (column.name === 'Re') {
                value = <td key={i}>{data.answ}</td>
            } else if (column.name === 'Тема') {
                let href = `topic.php?id=${data.id}`;
                value = 
                <td key={i}>
                    <a href={href} className="agb" target="_blank">{data.text}</a>
                </td>    
            } else if (column.name === 'Автор') {
                value = <td key={i}>{data.user0}</td>
            } else if (column.name === 'Обновлено') {
                value = <td key={i}>{data.user}</td>
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
}

class TopicsList extends Component {

    static propTypes = {
        items: PropTypes.array, //.isRequired,
        isFetching: PropTypes.bool, //.isRequired,
        lastUpdated: PropTypes.number,
        dispatch: PropTypes.func, //.isRequired
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(fetchTopicsListIfNeeded())
    }

    render() {
        let columns = [
            { name: 'Раздел', className: 'cc', width: '50px' },
            { name: 'Re', className: 'cc', width: '30px' },
            { name: 'Тема', className: 'ct' },
            { name: 'Автор', className: 'cl', width: '120px' },
            { name: 'Обновлено', className: 'cl', width: '150px' }
        ]

        const { items, isFetching } = this.props;
        console.log(items);

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