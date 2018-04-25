import React from 'react';
import classNames from 'classnames'

import './nav_bar.css'

const NavBar = (props) => {

    const menu = [
        { name: 'Форум', link: '/' },
        { name: '1С:Предприятие', link: '/' },
        { name: 'Работа', link: '/' },
        { name: 'Wiki', link: 'http://wiki.mista.ru' },
        { name: 'Книга знаний', link: 'http://kb.mista.ru' },
        { name: 'Каталог разработок', link: 'http://catalog.mista.ru' }
    ];

    let current = 0;

    const menuItems = menu.map((item, i) => {
        const classes = classNames('nav-item', { 'active': i === current })
        return (
            <li key={i} className={classes}>
                <a className='inline-block' href={item.link}>{item.name}</a>
            </li>
        )
    });

    return (
        <div id='header' className="header">
            <ul className="nav-bar">
                {menuItems}
            </ul>
        </div>
    )
}

export default NavBar;