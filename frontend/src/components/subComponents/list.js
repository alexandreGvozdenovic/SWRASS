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
import { Redirect } from 'react-router-dom'

function List({array, type}) {


    let arrayList = array.map((element,index)=>{
        let property;
        let propertyBis;
        if(type === 'people' || type === 'species' || type === 'planets') property = 'name';
        if(type === 'films') property = 'title';
        if(type === 'vehicles' || type === 'starships') property = 'name'; propertyBis = 'model';

        return (
            <ListGroup.Item 
                key={index + element[property]}
                style={{cursor:'pointer'}}
            >
                {element[property]} {element[propertyBis] !== undefined ? ` - ${element[propertyBis]}` : ''}
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
