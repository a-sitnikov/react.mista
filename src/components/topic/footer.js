//@flow
import * as React from 'react'
import { connect } from 'react-redux'
import type { Dispatch } from 'redux'
import { Button } from 'react-bootstrap'

import { fetchNewMessagesIfNeeded } from 'src/actions/topic'
import { addBookmark } from 'src/actions/bookmark'
import { getMaxPage } from 'src/utils'

type FooterProps = {
    info: any,
    dispatch: Dispatch<*>,
    bookmark: any,
    isFetching: boolean,
    params: any    
}

class Footer extends React.Component<FooterProps> {

    onRefreshClick;
    onBookmarkClick;

    constructor(props) {
        super(props);

        this.onRefreshClick = this.onRefreshClick.bind(this);
        this.onBookmarkClick = this.onBookmarkClick.bind(this);
    }

     onBookmarkClick() {
        const { info, dispatch } = this.props;
        dispatch(addBookmark(info));
    }

    onRefreshClick() {
        
        const { info, dispatch } = this.props;
        
        dispatch(fetchNewMessagesIfNeeded({
            id: info.id,
            last: parseInt(info.answers_count, 10)
        }));

    }

    render() {

        const { info, bookmark, isFetching, params } = this.props;
        const maxPage = getMaxPage(info.answers_count);

        let updateButton;
        let page = params.page || 1;
        if (page === 'last20' || page === maxPage )    
            updateButton = 
            <Button onClick={this.onRefreshClick} disabled={bookmark.isFetching} bsSize="sm">{isFetching ? 'Обновляется': 'Обновить ветку'}</Button>

        return (
            <div className="flex-row" >
                <div className="ta-left va-top" style={{ width: "50%" }}>
                    <Button onClick={this.onBookmarkClick} disabled={bookmark.isFetching} bsSize="sm">{bookmark.isFetching ? 'Подождите...' : 'Закладка'}</Button>
                </div>
                <div className="ta-right va-middle" style={{ marginLeft: "auto" }}>
                    {updateButton}
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {

    const {
        isFetching,
        lastUpdated,
        info,
    } = state.topic || {
        isFetching: true,
        info: {},
    }

    return {
        info,
        isFetching,
        lastUpdated,
        bookmark: state.bookmark || {}
    }
}

export default connect(mapStateToProps)(Footer);