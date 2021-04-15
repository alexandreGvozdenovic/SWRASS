import React, {useState, useEffect} from 'react';
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
import Card from 'react-bootstrap/Card';
// REDUX
import { connect } from 'react-redux'
// REACT ROUTER
import { Redirect } from 'react-router-dom'
// MY COMPONENTS
import CustomList from '../subComponents/list';
import NavBar from '../subComponents/navbar';
import PlanetCard from '../subComponents/cards/planetCard';
import FilmCard from '../subComponents/cards/filmCard';
import PersonCard from '../subComponents/cards/personCard';
// MASONRY
import Masonry from 'react-masonry-css';

function PersonDetails({userFromStore, location}) {
    const [person, setPerson] = useState([]);

    useEffect(() => {
        const getPersonInformation = () => {
            let personFromFront = JSON.stringify(location.state.person);
            fetch(`http://localhost:3000/person?personFromFront=${personFromFront}`)
            .then(response => response.json())
            .then((jsonResponse) => {
                console.log(jsonResponse.populatedPerson)
                setPerson(jsonResponse.populatedPerson);
            })

        }
        getPersonInformation();
    },[])

    let filmCards = person.films.map((film,index)=>{
        return (
            <Col xs={12} md={4}>
                <FilmCard key={index + film.title} film={film} />
            </Col>
            
        )
    })

    if(!userFromStore) {
        return ( <Redirect to='/' />)
    }
  return (
      <Container>
          <NavBar />
          {/* <h1 className='Title mt-4'>Star Wars Rebels Alliance Search System</h1> */}
          <h4 className='SubTitle mt-4'>This is {person.name}</h4>
          <h5 className='SubTitle mt-4'>Learn all there is to know about {person.gender === 'male' ? 'him' : 'her'}</h5>
          <Row className='display-flex flex-column mt-4'>
              <h6>Description :</h6>
              <p>
                  {person.name} was born the year {person.birth_year} {person.gender === 'male' ? 'he' : 'she'} is {person.height} cm tall and weights {person.mass} kg. {person.gender === 'male' ? 'He' : 'She'} has {person.eye_color} eyes, {person.hair_color} hair and {person.skin_color} skin.
              </p>
            
          </Row>
          <Row className='display-flex flex-column mt-4'>
            <h6>Homeworld :</h6>
            <Row>
                <PlanetCard planet={person.homeworld}/>
            </Row>
          </Row>
          <Row className='display-flex flex-column mt-4'>
            <h6>Apparition in films :</h6>
            <Row>
                {filmCards}
            </Row>
          </Row>
      </Container>
  );
}

function mapStateToProps(state) {
    return { userFromStore: state.user }
  }

function mapDispatchToProps(dispatch) {
    return {
      authorizedUser: function(user) { 
          dispatch( {type: 'authorizedUser', user: user} ) 
      }
    }
  }
  
  export default connect(
      mapStateToProps,
      mapDispatchToProps
  )(PersonDetails);
