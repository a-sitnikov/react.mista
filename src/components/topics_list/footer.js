//@flow
import React, { Component } from 'react'

import './footer.css'

type FooterProps = {
    page: string,
}

type Props = FooterProps;

class Footer extends Component<Props> {

    render() {

        const { page } = this.props;
        let currentPage = parseInt(page, 10) || 1;
        let pages = [];
        for (let i = 1; i <= 10; i++) {
            let href = `${window.hash}/index.php?page=${i}`;

            if (currentPage === i) {
                pages.push(<span key={i} style={{ margin: '5px' }}><b>{i}</b></span>);
            } else {
                pages.push(<a key={i} href={href} style={{ margin: '5px' }}>{i}</a>);
            }
        }

        return (
            <div id='tf' className="tf">
                {pages}
            </div>
        )
    }
}

export default Footer;