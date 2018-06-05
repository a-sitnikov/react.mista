//@flow
import React, { Component } from 'react'

import { paramsToString } from 'src/api'
import './footer.css'

type FooterProps = {
    page: string,
    locationParams: {}
}

type Props = FooterProps;

class Footer extends Component<Props> {

    render() {

        const { page, locationParams } = this.props;
        let currentPage = parseInt(page, 10) || 1;
        let pages = [];

        for (let i = 1; i <= 10; i++) {
            let params = {...locationParams, page: i };
            let href = `${window.hash}/index.php` + paramsToString('?', params);

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

export default Footer;