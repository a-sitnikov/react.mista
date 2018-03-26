import React, { Component } from 'react'
import Banner from '../banner'

class Title extends Component {

    render() {

        return (
            <div id="header-table" style={{ width: "100%", display: "flex" }}>
                <div id="title-td" style={{ width: "280px", whiteSpace: "nowrap", flex: "0 0 0%" }}>
                    <h1 className="forum-title">
                        <a href="index.php"><span>Волшебный </span>&nbsp;<span>Форум</span></a>
                    </h1>
                </div>
                <div id="banner-center-td" style={{ flex: "1" }}>
                    <Banner />
                </div>
            </div>
        )
    }
}

export default Title;