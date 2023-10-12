import { ReactElement } from "react";
import { useDispatch } from "react-redux";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import { Link, useLocation } from "react-router-dom";

import Search from "src/components/common/search";
import { getTopicsListIfNeeded } from "src/store";

import "./nav_bar.css";

const NavBar = (): ReactElement => {
  const location = useLocation();
  const dispatch = useDispatch();

  const locationParams = new URLSearchParams(location.search);
  const forum = locationParams.get("forum");

  const onClick = () => {
    dispatch(getTopicsListIfNeeded({}));
  };

  const internalLinks = [
    { name: "1C", link: `/index.php?forum=1C` },
    { name: "IT", link: `/index.php?forum=IT` },
    { name: "JOB", link: `/index.php?forum=JOB` },
    { name: "LIFE", link: `/index.php?forum=LIFE` },
    { name: "Настройки", link: "/options.php" },
  ];

  const externalLinks = [
    { name: "Wiki", link: "https://wiki.mista.ru" },
    { name: "Книга знаний", link: "https://kb.mista.ru" },
  ];

  return (
    <Navbar bg="dark" variant="dark" expand="md" fixed="top">
      <Navbar.Brand as={Link} to={`/`} onClick={onClick}>
        React.Mista
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse>
        <Nav className="me-auto">
          {internalLinks.map((item, i) => (
            <Nav.Item key={"i" + i}>
              <Nav.Link to={item.link} active={item.name === forum} as={Link}>
                {item.name}
              </Nav.Link>
            </Nav.Item>
          ))}
          {externalLinks.map((item, i) => (
            <Nav.Item key={"e" + i}>
              <Nav.Link href={item.link}>{item.name}</Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
        <Form className="d-flex">
          <Search />
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
