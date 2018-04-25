import React, { Component } from 'react'
import Banner from '../banner'
import './title.css'

class Title extends Component {

    render() {

        return (
            <div id="title" className="flex-row">
                <div /*id="title-td" className="title-td"*/>
                    <h1 className="title">
                        <a href={`${window.hash}`}><span>В</span>олшебный&nbsp;<span>Ф</span>орум</a>
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