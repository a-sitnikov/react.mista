import React, { Component } from 'react'

class Search extends Component {

    render() {
        return (
            <td className="ta-center va-bottom">
                <form name="find_form">
                    <a id="findlink" href="/find.php" className="findlink" target="_blank" style={{marginRight: "5px"}}>Поиск</a>
                    <input className="findfield" name="keywords" id="keywords" type="text" style={{width: "400px"}}/>
                </form>
            </td>
        )
    }
}

export default Search;