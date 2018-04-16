//@flow
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import queryString from 'query-string'

import Login from '../login'
import Search from './search'
import SectionSelect from './section_select'
import { fetchSectionsIfNeeded } from '../../actions/sections'

import type { DefaultProps } from 'src/components'
import type { State } from 'src/reducers'
import type { SectionsState } from 'src/reducers/sections'

type StateProps = {
    sections: SectionsState
}

type Props = StateProps & DefaultProps;

class Header extends Component<Props> {

    onSectionSelect: () => void;

    constructor(props) {
        super(props);
        this.onSectionSelect = this.onSectionSelect.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchSectionsIfNeeded());
    }
    
    onSectionSelect(event, value) {
        if (value)
            this.props.history.push(`${window.hash}/index.php?section=${value.shortn}`);
        else
            this.props.history.push(`${window.hash}/index.php`);
    }

    render() {

        const { location, sections } = this.props;
        const params = queryString.parse(location.search);

        let groupsElem = [];
        for (let forum in sections.tree) {
            groupsElem.push(<span key={"s" + forum} className="separator">|</span>);
            groupsElem.push(<a key={forum} rel="nofollow" href={`${window.hash}/index.php?forum=${forum}`}>{forum.toUpperCase()}</a>);
        }

        return (
            <div className="flex-row">
                <div id="user-td" style={{ flex: "0 auto", marginRight: "15px", paddingTop: "5px", verticalAlign: "top" }}>
                    <Login />
                </div>
                <div style={{ flex: 1, height: "auto", position: "relative" }}>
                    <div style={{ position: "absolute", bottom: "0px", width: "100%" }}>
                        <Search />
                    </div>
                </div>
                <div id="section-td" style={{ flex: 0, paddingTop: "5px", verticalAlign: "top" }}>

                    <span className="ah">
                        <a rel="nofollow" href="">Все</a>
                        {groupsElem}
                    </span>
                    <SectionSelect defaultValue="--Все секции--" selected={params.section} className="findfield" id="section_selector" name="section_selector" onChange={this.onSectionSelect} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: State): StateProps => {

    return {
        sections: state.sections
    }
}

export default connect(mapStateToProps)(withRouter(Header));