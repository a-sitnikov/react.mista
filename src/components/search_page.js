import React, { Component } from 'react'
import { connect } from 'react-redux'

class SearchPage extends Component {

    constructor(props) {
        super(props);
        this.onSearch = this.onSearch.bind(this);
    }

    onSearch() {

    }

    render() {
        return (
            <div>
            </div>    
        )
    }

}    

const mapStateToProps = state => {

    return state;

}

export default connect(mapStateToProps)(SearchPage);