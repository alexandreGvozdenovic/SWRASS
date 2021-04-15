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

function StarshipCard({starship}) {
  return (
    <Card className='mt-4' style={{ width: '18rem', height: '18rem' }}>
      <Card.Body>
        <Card.Title>{starship.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{starship.model}</Card.Subtitle>
        <Card.Text>
          Some trivia about this starship : <br/>
          Manufacturer - {starship.manufacturer} <br/>
          Cost - {starship.cost_in_credits} credits <br />
          Max atmospherique speed - {starship.max_atmosphering_speed} km/h <br/>
        </Card.Text>
          <Link 
            to={{
              pathname: "/starship-details",
              state: { starship: starship }
              }}
          >
            Learn more
          </Link>
      </Card.Body>
    </Card>
)
}
  export default StarshipCard;