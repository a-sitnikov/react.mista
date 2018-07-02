import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
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
            { name: 'Wiki', link: 'http://wiki.mista.ru' },
            { name: 'Книга знаний', link: 'http://kb.mista.ru' },
        ];

        const menuItems = menu.map((item, i) => {
            return (
                <NavItem key={i} href={item.link}>{item.name}</NavItem>
            )
        });
        
        return (
            <Navbar fluid inverse fixedTop>
                <Navbar.Brand className="navbar-brand">
                    <a href={`${window.hash}`} onClick={this.onClick}>React.Mista</a>
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
}

export default connect()(withRouter(NavBar));