import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const NavbarComponent = () => {
  const guestLinks = (
    <Nav className="justify-content-end">
      <Nav.Link as={Link} to="/profiles">
        Profiles
      </Nav.Link>
      <Nav.Link as={Link} to="/register">
        Register
      </Nav.Link>
      <Nav.Link as={Link} to="/login">
        Login
      </Nav.Link>
    </Nav>
  );

  return (
    <Navbar fixed="top" expand="sm" bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/" className="ml-2">
        inTouch
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="ml-auto">{guestLinks}</Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
