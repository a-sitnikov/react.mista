import React from 'react';
import classNames from 'classnames'

import { Navbar, Nav, NavItem, Button, FormGroup, FormControl } from 'react-bootstrap'

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

    let currentItem = 0;

    const menuItems = menu.map((item, i) => {
        const classes = classNames('nav-item')
        return (
            <NavItem eventKey={1} href={item.link}>{item.name}</NavItem>
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
                    <FormGroup bsSize="sm">
                        <FormControl componentClass="select">
                            <option value="yandex">Яндекс</option>
                            <option value="google">Google</option>
                        </FormControl>{' '}
                        <FormControl type="text" placeholder="Поиск"/>{' '}
                        <Button type="submit" bsSize="sm">Найти</Button>
                    </FormGroup>
                </Navbar.Form>
            </Navbar.Collapse>
        </Navbar>
    )
    return (
        <div id='header' className="header">
            <ul className="nav-bar">
                {menuItems}
            </ul>
        </div>
    )
}

export default NavBar;