import React, { Component } from 'react'
import { connect } from 'react-redux'

import Login from '../login'

class Header extends Component {

    render() {

        const { info } = this.props;
        const forums = {
            '1c': '1С:Предприятие',
            'life': 'О жизни',
            'it': 'Информационные технологии'
        };

        return (

            <div className="flex-row">
                <div id="user-td" style={{ flex: "0 auto", marginRight: "15px", paddingTop: "5px", verticalAlign: "top" }}>
                    <Login />
                </div>
                <div id="section-td" style={{ flex: 1, paddingTop: "5px", verticalAlign: "top" }}>
                    <span id="forum_string" className="section-name">
                        <a rel="nofollow" href={`&{window.hash}/index.php?forum=${info.forum}`} style={{ textDecoration: "none" }}>{forums[info.forum]}</a>
                    </span>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {

    const {
        info
    } = state.topic || {
        info: {
            forum: ''
        }
    }

    return {
        info
    }
}

export default connect(mapStateToProps)(Header);