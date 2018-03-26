import React, { Component } from 'react'

class Search extends Component {

    //            <div className="ta-center va-bottom" style={{float: "left", width: "100%"}}> *
    render() {
        return (
            <div name="find_form" style={{ width: "100%" }}>
                <a id="findlink" href="/find.php" className="findlink" target="_blank" style={{ marginRight: "5px"  }}>Поиск</a>
                <input className="findfield" name="keywords" id="keywords" type="text" style={{ maxWidth: "100%", width: "calc(100% - 80px)" }} />
            </div>
        )
    }
}

export default Search;