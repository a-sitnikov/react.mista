import React from 'react'
import Login from '../login'

const Header = (props) => {

    const { info } = props;
    const forums = {
        '1c': '1С:Предприятие',
        'life': 'О жизни',
        'it': 'Информационные технологии'
    };
    
    return (
        <table id="header-table-2" style={{ marginBottom: "10px" }}>
            <tbody>
                <tr>
                    <Login />
                    <td id="section-td" className="va-top">
                        <span className="section-name">
                            <span id="forum_string">
                                <a rel="nofollow" href="index.php?forum=1c" style={{textDecoration: "none"}}>{forums[info.forum]}</a>
                            </span>
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default Header;