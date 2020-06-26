import React, { useState } from "react";
import { Container, NavDropdown, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  const [publicURL, setPublicURL] = useState("/myTask/");

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Link to={`${publicURL}`}>
          <Navbar.Brand>Task Management</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link to={`${publicURL}`}>
              <Nav.Item className="text-white mr-2 ">Home</Nav.Item>
            </Link>
            <Link to={`${publicURL}projects`}>
              <Nav.Item className="text-white mr-2 ">Projects</Nav.Item>
            </Link>
            <Link to={`${publicURL}about`}>
              <Nav.Item className="text-white mr-2 ">About</Nav.Item>
            </Link>
            <Link to={`${publicURL}contact`}>
              <Nav.Item className="text-white mr-2 ">Contact</Nav.Item>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
