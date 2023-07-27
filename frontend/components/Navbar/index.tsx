"use client";

import './style.css'

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
    <Navbar bg="white" expand="lg" className="px-3">
      <Navbar.Brand href="/" className="d-flex align-items-center">
        <img
          src="/logo.jpg"
          width="60"
          height="60"
          className="d-inline-block align-top"
          alt="Logo"
        />
        <span className="ms-1 mt-2 mens">MENSWEAR</span>
      </Navbar.Brand>
      
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto navwords">
          <Nav.Link as={Link} href="/">HOME</Nav.Link>
          <Nav.Link as={Link} href='/code'>REFERAL</Nav.Link>
          {user ? (
                <>
                    <button onClick={logout}>LOGOUT</button>
                    <p className="user">{user.username}</p>

                </>
            ) : (
                <>
                    <Nav.Link as={Link} href="/register">REGISTER</Nav.Link>
                    <Nav.Link as={Link} href="/login">LOGIN</Nav.Link>
                </>
            )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
