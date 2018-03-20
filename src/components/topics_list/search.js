import React, { Component } from 'react'

class Search extends Component {

    render() {
        return (
            <td className="ta-center va-bottom">
                <form name="find_form">
                    <a id="findlink" href="/find.php" className="findlink" target="_blank">Поиск</a>
                    <input className="findfield" name="keywords" id="keywords" type="text" />
                </form>
            </td>
        )
    }
}

export default Search;