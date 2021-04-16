import React, {useState} from 'react';
import '../../App.css';
// BOOTSTRAP
import Button from 'react-bootstrap/Button';

import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
// REDUX
import { connect } from 'react-redux'
// REACT ROUTER
import { Link } from 'react-router-dom'
// MY COMPONENTS
import CustomList from '../subComponents/list';
// MASONRY
import Masonry from 'react-masonry-css';

function NavbarComponent() {
  return (
    <Navbar bg="light" expand="lg">
    <Navbar.Brand>
        <Link to='/home' style={{textDecoration:'none', color:'black'}}>
            SWRASS
        </Link>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
            <Link to='/home' className='mr-2'>Home</Link>
            <Link to='/people' className='mr-2'>People</Link>
            <Link to='/species' className='mr-2'>Species</Link>
            <Link to='/planets' className='mr-2'>Planets</Link>
            <Link to='/films' className='mr-2'>Films</Link>
            <Link to='/vehicles' className='mr-2'>Vehicles</Link>
            <Link to='/starships' className='mr-2'>Starships</Link>


        </Nav>
        {/* <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-success">Search</Button>
        </Form> */}
    </Navbar.Collapse>
    </Navbar>
  );
}

  export default NavbarComponent;
