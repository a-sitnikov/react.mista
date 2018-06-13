import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap'

import Search from 'src/components/common/search'
import './nav_bar.css'

const NavBar = (props) => {

    const menu = [
        { name: '1С', link: `${window.hash}/index.php?forum=1C` },
        { name: 'IT', link: `${window.hash}/index.php?forum=IT` },
        { name: 'JOB', link: `${window.hash}/index.php?forum=JOB` },
        { name: 'LIFE', link: `${window.hash}/index.php?forum=LIFE` },
        { name: 'Wiki', link: 'http://wiki.mista.ru' },
        { name: 'Книга знаний', link: 'http://kb.mista.ru' },
        { name: 'Настройки', link: `${window.hash}/options.php` },
    ];

    const menuItems = menu.map((item, i) => {
        return (
            <NavItem key={i} href={item.link}>{item.name}</NavItem>
        )
    });

    return (
        <Navbar fluid inverse style={{marginBottom: "10px"}}>
            <Navbar.Brand className="navbar-brand">
                <a href={`${window.hash}`}>React.Mista</a>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Nav>
            </Nav>
            <Navbar.Collapse>
                <Nav>
                {menuItems}
                </Nav>
                <Navbar.Form pullRight>
                    <Search />
                </Navbar.Form>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar;