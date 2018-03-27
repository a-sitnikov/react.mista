import React, { Component } from 'react'
import Banner from '../banner'

class Title extends Component {

    render() {

        return (
            <div id="title" className="flex-row">
                <div id="title-td" className="title-td">
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