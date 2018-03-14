import React, { Component } from 'react'
import { connect } from 'react-redux'
import queryString from 'query-string'
import PropTypes from 'prop-types'
import { fetchTopicsListIfNeeded } from '../../actions/topics_list'
import Title from './title'
import Header from './header'
import Row from './row'
import Footer from './footer'
import NewTopic from './new_topic'

class TopicsList extends Component {

    static propTypes = {
        items: PropTypes.array.isRequired,
        isFetching: PropTypes.bool.isRequired,
        lastUpdated: PropTypes.number,
        dispatch: PropTypes.func.isRequired
    }

    componentDidMount() {
        const { dispatch, location } = this.props
        const queryParams = queryString.parse(location.search);

        this.page = queryParams.page || 1;
        dispatch(fetchTopicsListIfNeeded(this.page));
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
        return (
            <div>
                <Title/>
                <Header/>
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
                <Footer page={this.page}/>
                <br/>
                <NewTopic />
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