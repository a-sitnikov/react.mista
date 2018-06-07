import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap'

import Search from 'src/components/common/search'
import './nav_bar.css'

const NavBar = (props) => {

    const menu = [
        { name: 'Форум', link: `${window.hash}/` },
        { name: '1С:Предприятие', link: `${window.hash}/index.php?forum=1C` },
        { name: 'Работа', link: `${window.hash}/index.php?forum=JOB` },
        { name: 'Wiki', link: 'http://wiki.mista.ru' },
        { name: 'Книга знаний', link: 'http://kb.mista.ru' },
        { name: 'Каталог разработок', link: 'http://catalog.mista.ru' }
    ];

    const menuItems = menu.map((item, i) => {
        return (
            <NavItem key={i} href={item.link}>{item.name}</NavItem>
        )
    });

    return (
        <Navbar fluid inverse>
            <Navbar.Toggle />
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