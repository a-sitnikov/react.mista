//@flow
import React, { Component } from 'react'
import { connect } from 'react-redux'

import type { State } from '../../reducers'

type Props = {

};

class SearchResults extends Component<Props> {

    render() {
        return <div />
    }

}

const mapStateToProps = (state: State) => {

    return {
    }
}

export default connect(mapStateToProps)(SearchResults);