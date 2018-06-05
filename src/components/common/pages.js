//@flow
import React, { Component } from 'react'

import { paramsToString } from 'src/api'
import './pages.css'

type FooterProps = {
    locationParams: { page: string },
    baseUrl: string,
    maxPage: number
}

type Props = FooterProps;

class Pages extends Component<Props> {

    render() {

        const { locationParams, baseUrl, maxPage } = this.props;
        let currentPage = parseInt(locationParams.page, 10) || 1;
        let pages = [];

        for (let i = 1; i <= maxPage; i++) {
            let params = {...locationParams, page: i };
            let href = `${window.hash}/${baseUrl}` + paramsToString('?', params);

            if (currentPage === i) {
                pages.push(<li key={i} className="active">{i}</li>);
            } else {
                pages.push(<li key={i}><a href={href}>{i}</a></li>);
            }
        }

        return (
            <div id='tf' className="tf">
                <ul>
                    {pages}
                </ul>    
            </div>
        )
    }
}

export default Pages;