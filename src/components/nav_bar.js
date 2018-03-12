import React from 'react';

const NavBar = () => {

  let menu = [
    { name: 'Форум', link: '/' },
    { name: '1С:Предприятие', link: '/' },
    { name: 'Работа', link: '/' },
    { name: 'Wiki', link: 'http://wiki.mista.ru' },
    { name: 'Книга знаний', link: 'http://kb.mista.ru' },
    { name: 'Каталог разработок', link: 'http://catalog.mista.ru' }
  ];
  let menuItems = menu.map((item, i) => (
    <li key={i} className='nav-item'>
      <a className='inline-block' href={item.link}>{item.name}</a>
    </li>));

  return (
    <div id='header' className="header">
      <ul className="nav-bar">
        {menuItems}
      </ul>
    </div>
  )
}

export default NavBar;