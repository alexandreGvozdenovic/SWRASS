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

function VehicleCard({vehicle}) {
  return (
    <Card className='mt-4' style={{ width: '18rem', height: '18rem' }}>
      <Card.Body>
        <Card.Title>{vehicle.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{vehicle.model}</Card.Subtitle>
        <Card.Text>
          Some trivia about this vehicle : <br/>
          Manufacturer - {vehicle.manufacturer} <br/>
          Cost - {vehicle.cost_in_credits} credits <br />
          Max speed - {vehicle.max_atmosphering_speed} km/h <br/>
        </Card.Text>
          <Link 
            to={{
              pathname: "/vehicle-details",
              state: { vehicle: vehicle }
              }}
          >
            Learn more
          </Link>
      </Card.Body>
    </Card>
)
}
  export default VehicleCard;
