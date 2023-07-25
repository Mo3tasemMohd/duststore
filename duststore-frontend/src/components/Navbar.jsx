import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

export function NavBar() {
  return (
    <Navbar bg="light" expand="lg" className="px-5">
      <Navbar.Brand href="/home" className="d-flex align-items-center">
        <img
          src="logo.jpg"
          width="60"
          height="60"
          className="d-inline-block align-top"
          alt="Logo"
        />
        <span className="ms-1 mt-2">Menswear</span>
      </Navbar.Brand>
      
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="/home">Code</Nav.Link>
          <Nav.Link href="/home">Login</Nav.Link>
          <Nav.Link href="/home">Register</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
