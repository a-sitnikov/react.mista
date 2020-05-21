import React, { Component } from 'react';
import { connect } from 'react-redux'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import queryString from 'query-string'
import { withRouter } from 'react-router-dom'

import Search from 'src/components/common/search'
import { fetchTopicsListIfNeeded } from 'src/actions/topics_list'

import './nav_bar.css'

class NavBar extends Component {

    constructor() {
        super();
        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        const { dispatch, location } = this.props;
        let locationParams = queryString.parse(location.search);
        dispatch(fetchTopicsListIfNeeded(locationParams));
    }

    render() {

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
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand
                    href={`${window.hash}`} onClick={this.onClick}>React.Mista
                </Navbar.Brand>
                <Navbar.Toggle  aria-controls="basic-navbar-nav" />
                <Navbar.Collapse>
                    <Nav>
                    {menuItems}
                    </Nav>
                    <Form inline className="justify-content-end">
                        <Search />
                    </Form>
               </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default connect()(withRouter(NavBar));