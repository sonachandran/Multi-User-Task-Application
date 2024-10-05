import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, Outlet } from 'react-router-dom';
const Usernav = () => {
  return (

    <div>
    <Navbar style={{padding:'23px'}} expand="lg" collapseOnSelect className="bg-body-tertiary fixed-navbar ">
      <Container>
        <Navbar.Brand href="#home">
          <span className=""><b ><span style={{color:'red',fontSize:'40px'}}> Task</span> Management System</b></span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto" style={{ gap: '20px' }}>
            {/* <Link to="./registration" className="text">Register</Link>
            <Link to="./login" className="text">Login</Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Outlet />
  </div>
  )
}

export default Usernav





