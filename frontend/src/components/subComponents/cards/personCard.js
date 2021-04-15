import React, {useState, useEffect} from 'react';
import '../../../App.css';
// BOOTSTRAP
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Card from 'react-bootstrap/Card';
// REDUX
import { connect } from 'react-redux'
// REACT ROUTER
import { Redirect, Link } from 'react-router-dom'
// MASONRY
import Masonry from 'react-masonry-css';

function PersonCard({person}) {
  return (
    <Card className='mt-4' style={{ width: '18rem', height: '22rem' }}>
      <Card.Body>
        <Card.Title>{person.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Gender : {person.gender}</Card.Subtitle>
        <Card.Text>
          Some trivia about {person.name} : <br/>
          Year of birth - {person.birth_year} <br/>
          Eyes color - {person.eye_color} <br />
          Hair color - {person.hair_color} <br/>
          Height - {person.height} cm <br/>
          Mass - {person.mass} kg <br/>
          Skin color - {person.skin_color} <br/>
        </Card.Text>
          <Link 
            to={{
              pathname: "/person-details",
              state: { person: person }
              }}
          >
            Learn more
          </Link>
      </Card.Body>
    </Card>
)
}
  export default PersonCard;
