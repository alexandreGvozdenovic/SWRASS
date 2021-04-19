import '../../App.css';
// BOOTSTRAP
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
// REACT ROUTER
import { Link } from 'react-router-dom'

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
    </Navbar.Collapse>
    </Navbar>
  );
}

  export default NavbarComponent;
