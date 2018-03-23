import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'

import Login from '../login'
import Search from './search'
import SectionSelect from './section_select'

class Header extends Component {

    constructor(props) {
        super(props);
        this.onSectionSelect = this.onSectionSelect.bind(this);
    }

    onSectionSelect(event, value) {
        if (value)
            this.props.history.push(`/index.php?section=${value.shortn}`);
        else    
            this.props.history.push(`/index.php`);
    }

    render() {
        
        const { location } = this.props;
        const params = queryString.parse(location.search);

        return (
            <table id="header-table-2" style={{ marginBottom: "10px" }}>
                <tbody>
                    <tr>
                        <Login />
                        <Search />
                        <td id="section-td">
                            <span className="ah">
                                <SectionSelect defaultValue="--Все секции--" selected={params.section} className="findfield" id="section_selector" name="section_selector" onChange={this.onSectionSelect} />
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }
}

export default withRouter(Header);