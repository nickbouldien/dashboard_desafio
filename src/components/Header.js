import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

const Header = () => (
  <Navbar inverse>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/">Desafio_1</Link>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav pullRight>
      <NavItem eventKey={1} href="/about">About</NavItem>
      <NavItem eventKey={2} href="#">GitHub</NavItem>
    </Nav>
  </Navbar>
);

export default Header;
