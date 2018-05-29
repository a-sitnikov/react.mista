//@flow
import React, { Component } from 'react'

import type { DefaultProps } from 'src/components'

import './footer.css'

type FooterProps = {
    page: string,
    locationParams: {}
}

type Props = FooterProps & DefaultProps;

class Footer extends Component<Props> {

    render() {

        const { page } = this.props;

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
            </div>
        )
    }
}

export default Footer;