//@flow
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { defaultTopicsListState } from 'src/reducers/topics_list'
import { fetchTopicsListIfNeeded } from 'src/actions/topics_list'

import type { State } from 'src/reducers'
import type { DefaultProps } from 'src/components'

import './footer.css'

type FooterProps = {
    page: string,
    locationParams: {}
}

type StateProps = {
    isFetching: boolean
}

type DispatchProps = {
    fetchTopicsListIfNeeded: (params: any) => void
}

type Props = FooterProps & StateProps & DispatchProps & DefaultProps;

class Footer extends Component<Props> {

    onRefreshClick;

    constructor(props) {
        super(props);
        this.onRefreshClick = this.onRefreshClick.bind(this);
    }
    
    onRefreshClick() {
        const { fetchTopicsListIfNeeded, locationParams } = this.props;       
        fetchTopicsListIfNeeded(locationParams);
    }

    render() {

        const { page, isFetching } = this.props;

        let currentPage = parseInt(page, 10);
        let pages = [];
        for (let i = 1; i <= 10; i++) {
            let href = `${window.hash}/index.php?page=${i}`;

            if (currentPage === i) {
                pages.push(<span key={i} style={{ margin: '5px' }}>{i}</span>);
            } else {
                pages.push(<a key={i} href={href} style={{ margin: '5px' }}>{i}</a>);
            }
        }

        return (
            <div>
                <div id='tf' className="tf">
                    <span className='pages'>
                        {pages}
                    </span>
                </div>
                <div style={{float: "right"}}>
                    <button id="refresh_button" type="button" className="button" onClick={this.onRefreshClick} disabled={isFetching}>{isFetching ? 'Обновляется': 'Обновить список'}</button>
                </div>    
            </div>
        )
    }
}

const mapStateToProps = (state: State): StateProps => {

    const {
        isFetching
    } = state.topicsList || defaultTopicsListState;

    return {
        isFetching
    }
}

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
    fetchTopicsListIfNeeded: (...params) => dispatch(fetchTopicsListIfNeeded(...params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Footer);