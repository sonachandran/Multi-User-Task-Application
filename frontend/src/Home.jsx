
import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <Navbar expand="lg" collapseOnSelect className="bg-body-tertiary fixed-top">
        <Container>
          <Navbar.Brand href="#home">
            <span className="head1">Task</span> <span className="head2">Management</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto" style={{ gap: '20px' }}>
              <Link to="./registration" className="text">Register</Link>
              <Link to="./login" className="text">Login</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
};

export default Home;
