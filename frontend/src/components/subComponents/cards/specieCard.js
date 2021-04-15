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

function SpecieCard({specie}) {
  return (
    <Card className='mt-4' style={{ width: '18rem', height: '18rem' }}>
      <Card.Body>
        <Card.Title>{specie.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{specie.classification}</Card.Subtitle>
        <Card.Text>
          Some trivia about this specie : <br/>
          Average height - {specie.average_height} cm <br/>
          Average lifespan - {specie.average_lifespan} years <br />
          Language - {specie.language} <br/>
        </Card.Text>
          <Link 
            to={{
              pathname: "/specie-details",
              state: { specie: specie }
              }}
          >
            Learn more
          </Link>
      </Card.Body>
    </Card>
)
}
  export default SpecieCard;