import React from 'react'

const Footer = (props) => {

    let currentPage = parseInt(props.page, 10);
    let pages = [];
    for (let i = 1; i <= 10; i++) {
        let href = `index.php?page=${i}`;

        if (currentPage === i) {
            pages.push(<span key={i} style={{ margin: '5px' }}>{i}</span>);
        } else {    
            pages.push(<a key={i} href={href} style={{ margin: '5px' }}>{i}</a>);
        }    
    }

    return (
        <table id='tf'>
            <tbody>
                <tr>
                    <td className="ta-left va-top" style={{ width: "25%" }}></td>
                    <td>
                        <span className='pages'>
                            {pages}
                        </span>
                    </td>
                    <td className="ta-left va-top" style={{ width: "25%" }}></td>
                </tr>
            </tbody>
        </table>
    )
}

export default Footer;