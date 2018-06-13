//@flow
import React, { Component } from 'react'
import { Pagination } from 'react-bootstrap'

import { paramsToString } from 'src/api'

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

            pages.push(<Pagination.Item active={currentPage === i} key={i} href={href}>{i}</Pagination.Item>);
        }

        return (
            <Pagination style={{margin: "0px"}}>
                {pages}
            </Pagination>            
        )
    }
}

export default Pages;