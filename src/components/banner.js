import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchBannerIfNeeded } from '../actions/banner'

class Banner extends Component {

    constructor(props) {
        super(props);
        this.updateBanner = this.updateBanner.bind(this);
    }

    updateBanner() {

    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchBannerIfNeeded());        
    }

    render() {
        return (
            <div>
                
            </div>   
        )
    }
}

export default connect()(Banner);    