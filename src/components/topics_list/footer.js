import React from 'react'

const Footer = (props) => {

    let currentPage = parseInt(props.page, 10);
    let pages = [];
    for (let i = 1; i <= 10; i++) {
        let href = `#/index.php?page=${i}`;

        if (currentPage === i) {
            pages.push(<span key={i} style={{ margin: '5px' }}>{i}</span>);
        } else {
            pages.push(<a key={i} href={href} style={{ margin: '5px' }}>{i}</a>);
        }
    }

    return (
        <div id='tf' style={{ paddingTop: "4px", paddingBottom: "4px", boxSizing: "border-box", width: "100%" }}>
            <span className='pages'>
                {pages}
            </span>
        </div>
    )
}

export default Footer;