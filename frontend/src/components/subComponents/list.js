import React, {useState} from 'react';
import '../../App.css';
// BOOTSTRAP
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
// REDUX
import { connect } from 'react-redux'
// REACT ROUTER
import { Redirect, Link } from 'react-router-dom'

function List({array, type}) {
    let arrayList = array.map((element,index)=> {
        let property;
        let path;
        switch (type) {
            case 'people':
              path = {
                  pathname: '/person-details',
                  state: {person: element}
              };
              property = 'name'
              break;
            case 'species':
                path = {
                    pathname: '/specie-details',
                    state: {specie: element}
                };
                property = 'name'
                break;
            case 'planets':
                path = {
                    pathname: '/planet-details',
                    state: {planet: element}
                };
                property = 'name'
                break;
            case 'films':
                path = {
                    pathname: '/film-details',
                    state: {film: element}
                };
                property = 'title'
                break;
            case 'vehicles':
                path = {
                    pathname: '/vehicle-details',
                    state: {vehicle: element}
                };
                property = 'model';
                break;
            case 'starships':
                path = {
                    pathname: '/starship-details',
                    state: {starship: element}
                };
                property = 'model';
                break;
            default:
              console.log(`ERROR IN THE SWITCH LIST`);
          }
        return (
            <ListGroup.Item 
                key={index + element[property]}
            >
                <Link 
                    to={path}
                    style={{textDecoration:'none', color:'black'}}
                >
                    {element[property]}
                </Link>
            </ListGroup.Item>
        )
    })

  return (
      <>
        {arrayList}
      </>
  );
}
  
  export default List;
