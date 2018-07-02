// @flow
import * as React from 'react'
import { connect } from 'react-redux'

import Login from '../login'

type Props = {
    info: { forum: string }
}

class Header extends React.Component<Props> {

    render() {

        const { info } = this.props;

        const forums = {
            '1c': '1С:Предприятие',
            'life': 'О жизни',
            'it': 'Информационные технологии',
            'job': 'Работа'
        };

        return (

            <div className="topic-header">
                <div id="user-td" style={{ flex: "0 auto", marginRight: "15px", paddingTop: "5px", verticalAlign: "top" }}>
                    <Login />
                </div>
                <div id="section-td" className="ta-right" style={{ flex: 1, paddingTop: "5px", verticalAlign: "top", marginLeft: "auto" }}>
                    <span id="forum_string" className="bold120">
                        <a rel="nofollow" href={`${window.hash}/index.php?forum=${info.forum}`} style={{ textDecoration: "none" }}>{forums[info.forum]}</a>
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