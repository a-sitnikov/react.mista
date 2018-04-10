//@flow
import React, { Component } from 'react'
import { connect } from 'react-redux'

import type { DefaultProps } from '../../components'

import { doSearch } from '../../actions/search'
import type { RequestSearch } from '../../api'

import type { State } from '../../reducers'

type Props = {
    doSearch: (params: RequestSearch) => void
} & DefaultProps;

class Search extends Component<Props> {

    refs;
    onSearch;

    constructor(props: Props) {
        super(props);
        this.onSearch = this.onSearch.bind(this);
    }

    onSearch() {
        const { doSearch } = this.props
        doSearch({
            keywords: this.refs.input.value
        });
    }

    //            <div className="ta-center va-bottom" style={{float: "left", width: "100%"}}> *
    render() {
        return (
            <div name="find_form" style={{ width: "100%" }}>
                <a id="findlink" href="/find.php" className="findlink" target="_blank" style={{ marginRight: "5px"  }}>Поиск</a>
                <input className="findfield" name="keywords" id="keywords" type="text" style={{ maxWidth: "100%", width: "calc(100% - 80px)" }} ref='input'/>
            </div>
        )
    }
}

const mapStateToProps = (state: State) => ({})

const mapDispatchToProps = (dispatch) => ({
    doSearch: (params) => dispatch(doSearch(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(Search);