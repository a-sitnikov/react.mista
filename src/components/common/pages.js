//@flow
import React, { Component } from 'react'
import { Pagination } from 'react-bootstrap'

import { paramsToString } from 'src/api'
import './pages.css'

type FooterProps = {
    locationParams: { page?: string },
    baseUrl: string,
    maxPage: number,
    last20?: boolean
}

type Props = FooterProps;

class Pages extends Component<Props> {

    render() {

        const { locationParams, baseUrl, maxPage, last20 } = this.props;
        let currentPage;
        if (!locationParams.page) 
            currentPage = 1;
        else if (locationParams.page === "last20")
            currentPage = "last20";
        else
            currentPage = parseInt(locationParams.page, 10) || 1;
        
        let pages = [];
        for (let i = 1; i <= maxPage; i++) {
            let params = {...locationParams, page: i };
            let href = `${window.hash}/${baseUrl}` + paramsToString('?', params);

            pages.push(<Pagination.Item active={currentPage === i} key={i} href={href}>{i}</Pagination.Item>);
        }

        if (last20 === true) {
            let params = {...locationParams, page: "last20" };
            let href = `${window.hash}/${baseUrl}` + paramsToString('?', params);
            pages.push(<Pagination.Item active={currentPage === "last20"} key="last20" href={href}>»</Pagination.Item>);
        }

        return (
            <Pagination style={{margin: "0px"}}>
                {pages}
            </Pagination>            
        )
    }
}

export default ( Pages: Component );