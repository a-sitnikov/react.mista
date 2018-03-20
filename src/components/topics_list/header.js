import React from 'react'
import Login from '../login'
import Search from './search'

const Header = (props) => {

    return (
        <table id="header-table-2" style={{marginBottom: "10px"}}>
            <tbody>
                <tr>
                    <Login />
                    <Search />
                    <td>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default Header;