//@flow
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import queryString from 'query-string'

import Login from '../login'
import SectionSelect from './section_select'
import { fetchSectionsIfNeeded } from 'src/actions/sections'

import type { DefaultProps } from 'src/components'
import type { State } from 'src/reducers'
import type { SectionsState } from 'src/reducers/sections'

import './header.css'

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
            this.props.history.push(`/index.php?section=${value.shortn}`);
        else
            this.props.history.push(`/`);
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
                <div className="user-td">
                    <Login />
                </div>
                <div className="section-td">

                    <span className="ah">
                        <a rel="nofollow" href="">Все</a>
                        {groupsElem}
                    </span>
                    <SectionSelect 
                        defaultValue="--Все секции--" 
                        selected={params.section} 
                        className="field" 
                        onChange={this.onSectionSelect} 
                    />
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