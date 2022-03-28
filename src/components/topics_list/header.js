//@flow
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import queryString from 'query-string'

import Login from '../login'
import SectionSelect from './section_select'
import { fetchSectionsIfNeeded } from 'src/data/sections/actions'

import type { DefaultProps } from 'src/components'

type StateProps = {
}

type Props = StateProps & DefaultProps;

class Header extends Component<Props> {

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchSectionsIfNeeded());
    }
    
    onSectionSelect = (e, value) => {
        if (value)
            this.props.history.push(`/index.php?section=${value.shortn}`);
        else
            this.props.history.push(`/`);
    }

    render() {

        const { location } = this.props;
        const params = queryString.parse(location.search);

        return (
            <div className="flex-row">
                <div className="user-td">
                    <Login />
                </div>
                <div className="section-td" style={{marginLeft: "auto"}}>
                    <SectionSelect 
                        defaultValue="--Все секции--" 
                        selected={params.section} 
                        onChange={this.onSectionSelect}
                        size="sm" 
                    />
                </div>
            </div>
        )
    }
}

export default ( connect()(withRouter(Header)): any );