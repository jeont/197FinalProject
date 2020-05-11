import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../auth/authSlice';

const NavbarComponent = () => {
  const { authenticated, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const guestLinks = (
    <Nav className="justify-content-end">
      <Nav.Link as={Link} to="/login">
        Login
      </Nav.Link>
      <Nav.Link as={Link} to="/register">
        Register
      </Nav.Link>
    </Nav>
  );

  const authLinks = (
    <Nav className="justify-content-end">
      <Nav.Link onClick={() => dispatch(logOut())}>Log Out</Nav.Link>
    </Nav>
  );

  return (
    <Navbar fixed="top" expand="sm" bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/" className="ml-2">
        inTouch
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="ml-auto">
        {loading || !authenticated ? guestLinks : authLinks}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
