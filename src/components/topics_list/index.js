import React, { Component } from 'react'
import { connect } from 'react-redux'
import queryString from 'query-string'
import { fetchTopicsListIfNeeded } from '../../actions/topics_list'
import { fetchSectionsIfNeeded } from '../../actions/sections'
import Title from './title'
import Header from './header'
import Row from './row'
import Footer from './footer'
import NewTopic from './new_topic'

class TopicsList extends Component {

    componentDidMount() {
        const { dispatch } = this.props;

        this.location = this.props.location;
        const queryParams = queryString.parse(this.location.search);

        this.page = queryParams.page || 1;
        this.section = queryParams.section;
        dispatch(fetchTopicsListIfNeeded(this.page, this.section));
        dispatch(fetchSectionsIfNeeded());
    }

    componentWillReceiveProps(props) {
        const { dispatch, location } = props;

        if (this.location.search !== location.search) {

            this.location = this.props.location;
            const queryParams = queryString.parse(location.search);

            this.page = queryParams.page || 1;
            this.section = queryParams.section;
            dispatch(fetchTopicsListIfNeeded(this.page, this.section));
        }
    }

    render() {
        let columns = [
            { name: 'Раздел', className: 'cc', width: '50px' },
            { name: 'Re', className: 'cc', width: '30px' },
            { name: 'Тема', className: 'ct' },
            { name: 'Автор', className: 'cl', width: '120px' },
            { name: 'Обновлено', className: 'cl', width: '150px' }
        ]

        const { topicsList, sections } = this.props;
        return (
            <div>
                <Title />
                <Header history={this.props.history} />
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
                        {topicsList.items.map((item, i) => (
                            <Row key={i} data={item} columns={columns} />
                        ))}
                    </tbody>
                    <tfoot>
                    </tfoot>
                </table>
                <Footer page={this.page} />
                <br />
                <NewTopic sections={sections.items} />
            </div>
        )
    }
}


const mapStateToProps = state => {

    return {
        topicsList: state.topicsList || { items: [] },
        sections: state.sections || { items: [] }
    }
}

export default connect(mapStateToProps)(TopicsList);