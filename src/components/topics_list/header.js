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
            <div style={{ display: "flex", marginBottom: "10px" }}>
                <div id="user-td" style={{ flex: "0 0 350px", marginRight: "15px", paddingTop: "5px", verticalAlign: "top" }}>
                    <Login />
                </div>
                <div style={{ flex: 1, height: "auto", position: "relative" }}>
                    <div style={{ position: "absolute", bottom: "0px", width: "100%" }}>
                        <Search />
                    </div>
                </div>
                <div id="section-td" style={{ flex: 0, paddingTop: "5px", verticalAlign: "top" }}>

                    <span className="ah">
                        <a rel="nofollow" href="index.php">Все</a>&nbsp;|&nbsp;
<a rel="nofollow" href="index.php?forum=1c">1C</a>&nbsp;|&nbsp;
<a rel="nofollow" href="index.php?forum=it">IT</a>&nbsp;|&nbsp;
<a rel="nofollow" href="index.php?forum=job">JOB</a>&nbsp;
</span>
                    <SectionSelect defaultValue="--Все секции--" selected={params.section} className="findfield" id="section_selector" name="section_selector" onChange={this.onSectionSelect} />
                </div>
            </div>
        )
    }
}

export default withRouter(Header);