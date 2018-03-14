import React, { Component } from 'react'

class Title extends Component {

    render() {

        let banner = {};

        return (
            <table id="header-table">
                <tbody><tr>
                    <td id="title-td">
                        <h1 className="forum-title">
                            <a href="index.php"><span>Волшебный </span><span>Форум</span></a>
                        </h1>
                    </td>
                    <td id="banner-center-td" colSpan="2">
                        <div className="bnr bnr-top bnr-center">
                        </div>
                        <div className="bnr bnr-top bnr-right" style={{ display: "block !important" }}>
                            <a href={banner.href} target="_blank">
                                <img src={banner.img} alt="banner"/>
                            </a>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        )
    }
}

export default Title;