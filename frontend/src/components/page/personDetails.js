import React, {useState, useEffect} from 'react';
import '../../App.css';
// BOOTSTRAP
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

// REDUX
import { connect } from 'react-redux'
// REACT ROUTER
import { Redirect } from 'react-router-dom'
// MY COMPONENTS
import NavBar from '../subComponents/navbar';
import PlanetCard from '../subComponents/cards/planetCard';
import FilmCard from '../subComponents/cards/filmCard';
import SpecieCard from '../subComponents/cards/specieCard';
import VehicleCard from '../subComponents/cards/vehicleCard';
import StarshipCard from '../subComponents/cards/starshipCard';

function PersonDetails({userFromStore, location}) {
    const [person, setPerson] = useState();

    useEffect(() => {
        const getPersonInformation = () => {
            let personFromFront = JSON.stringify(location.state.person);
            fetch(`http://localhost:3000/person?personFromFront=${personFromFront}`)
            .then(response => response.json())
            .then((jsonResponse) => {
                setPerson(jsonResponse.populatedPerson);
            })

        }
        getPersonInformation();
    },[])


    if(!userFromStore) {
        return ( <Redirect to='/' />)
    } else if(person === undefined) {
        return (
            <Container>
                <NavBar />
                {/* <h1 className='Title mt-4'>Star Wars Rebels Alliance Search System</h1> */}
                <h4 className='SubTitle mt-4'>This is {location.state.person.name}</h4>
                <h5 className='SubTitle mt-4'>Learn all there is to know about {location.state.person.gender === 'male' ? 'him' : 'her'} in a few seconds <Spinner animation="border" /></h5>
            </Container>
        )
    } else {
        let filmCards = person.films.map((film, index)=>{
            return (
                <Col xs={12} md={4}>
                    <FilmCard key={index + film.title} film={film} />
                </Col>
                
            )
        })
        let specieCards = person.species.map((specie, index)=>{
            return (
                <Col xs={12} md={4}>
                    <SpecieCard key={index + specie.name} specie={specie} />
                </Col>
                
            )
        })
        let vehicleCards = person.vehicles.map((vehicle, index)=>{
            return (
                <Col xs={12} md={4}>
                    <VehicleCard key={index + vehicle.name} vehicle={vehicle} />
                </Col>
                
            )
        })
        let starshipCards = person.starships.map((starship, index)=>{
            return (
                <Col xs={12} md={4}>
                    <StarshipCard key={index + starship.name} starship={starship} />
                </Col>
                
            )
        })
    return (
        <Container className='mb-5'>
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
                    <Col>
                        <PlanetCard planet={person.homeworld}/>
                    </Col>
                </Row>
            </Row>
            <Row className='display-flex flex-column mt-4'>
                <h6>Specie(s) :</h6>
                <Row>
                    {specieCards}
                </Row>
            </Row>
            <Row className='display-flex flex-column mt-4'>
                <h6>Vehicle(s) :</h6>
                <Row>
                    {vehicleCards}
                </Row>
            </Row>
            <Row className='display-flex flex-column mt-4'>
                <h6>Starship(s) :</h6>
                <Row>
                    {starshipCards}
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
