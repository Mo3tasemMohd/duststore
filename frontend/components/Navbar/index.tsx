"use client";

import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Link from 'next/link';

import dynamic from 'next/dynamic';

import { AuthStatus } from "../AuthStatus";
import { useAuth } from "@/lib/useAuth";

const DynamicBootstrap = dynamic(
  () => require('bootstrap/dist/js/bootstrap.min.js'),
  { ssr: false }
);

export function NavBar() {
    const { user, logout } = useAuth();

    console.log({ user })


  return (
    <Navbar bg="light" expand="lg" className="px-5">
      <Navbar.Brand href="/home" className="d-flex align-items-center">
        <img
          src="/logo.jpg"
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
          <Nav.Link as={Link} href="/">Home</Nav.Link>
          <Nav.Link as={Link} href='/code'>Code</Nav.Link>
          {user ? (
                <>
                    <p className="leading-9">{user.username}</p>
                    <Button onClick={logout}>Logout</Button>
                </>
            ) : (
                <>
                    <Nav.Link as={Link} href="/register">Register</Nav.Link>
                    <Nav.Link as={Link} href="/login">Login</Nav.Link>
                </>
            )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
