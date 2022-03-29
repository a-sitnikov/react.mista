import React, { Component } from 'react';
import { connect, useDispatch } from 'react-redux'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import queryString from 'query-string'
import { useLocation } from "react-router-dom";

import Search from 'src/components/common/search'
import { getTopicsListIfNeeded } from 'src/data/topicslist/actions'

import './nav_bar.css'

const NavBar = (props) => {

  const location = useLocation();
  const dispatch = useDispatch();

  const onClick = (e) => {
    dispatch(getTopicsListIfNeeded({}));
  }

  const menu = [
    { name: '1С', link: `${window.hash}/index.php?forum=1C` },
    { name: 'IT', link: `${window.hash}/index.php?forum=IT` },
    { name: 'JOB', link: `${window.hash}/index.php?forum=JOB` },
    { name: 'LIFE', link: `${window.hash}/index.php?forum=LIFE` },
    { name: 'Wiki', link: 'https://wiki.mista.ru' },
    { name: 'Книга знаний', link: 'https://kb.mista.ru' },
  ];

  const menuItems = menu.map((item, i) => {
    return (
      <Nav.Item key={i}>
        <Nav.Link href={item.link}>
          {item.name}
        </Nav.Link>
      </Nav.Item>
    )
  });

  return (
    <Navbar bg="dark" variant="dark" expand="md" fixed="top">
      <Navbar.Brand
        href={`${window.hash}`}
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

export default connect()(NavBar);