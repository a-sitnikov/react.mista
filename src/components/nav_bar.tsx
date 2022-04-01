import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import { useLocation } from "react-router-dom";

import Search from 'src/components/common/search'
import { getTopicsListIfNeeded } from 'src/data/topicslist/actions'

import './nav_bar.css'
import { isConstructorDeclaration } from 'typescript';

const NavBar = (): ReactElement => {

  const location = useLocation();
  const dispatch = useDispatch();

  const locationParams = new URLSearchParams(location.search);
  const forum = locationParams.get('forum');

  const onClick = () => {
    dispatch(getTopicsListIfNeeded({}));
  }

  const menu = [
    { name: '1C', link: `#/index.php?forum=1C` },
    { name: 'IT', link: `#/index.php?forum=IT` },
    { name: 'JOB', link: `#/index.php?forum=JOB` },
    { name: 'LIFE', link: `#/index.php?forum=LIFE` },
    { name: 'Wiki', link: 'https://wiki.mista.ru' },
    { name: 'Книга знаний', link: 'https://kb.mista.ru' },
  ];

  const menuItems = menu.map((item, i) => {
    return (
      <Nav.Item key={i}>
        <Nav.Link href={item.link} active={item.name === forum}>
          {item.name}
        </Nav.Link>
      </Nav.Item>
    )
  });

  return (
    <Navbar bg="dark" variant="dark" expand="md" fixed="top">
      <Navbar.Brand
        href={`#`}
        onClick={onClick}>
        React.Mista
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse>
        <Nav className="mr-auto">
          {menuItems}
        </Nav>
        <Form inline>
          <Search />
        </Form>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar;