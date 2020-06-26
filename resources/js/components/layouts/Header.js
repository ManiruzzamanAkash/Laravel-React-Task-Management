import React, { useState } from "react";
import { Container, NavDropdown, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  const [publicURL, setPublicURL] = useState("/myTask/");

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="#home">
          <Link to={`${publicURL}`}>Task Management</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#">
              <Link to={`${publicURL}`}>Home</Link>
            </Nav.Link>
            <Nav.Link href="#">
              <Link to={`${publicURL}about`}>About</Link>
            </Nav.Link>
            <Nav.Link href="#">
              <Link to={`${publicURL}contact`}>Contact</Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
