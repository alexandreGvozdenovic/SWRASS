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
import Spinner from 'react-bootstrap/Spinner';

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
import SpecieCard from '../subComponents/cards/specieCard';
import VehicleCard from '../subComponents/cards/vehicleCard';
import StarshipCard from '../subComponents/cards/starshipCard';
// MASONRY
import Masonry from 'react-masonry-css';

function FilmDetails({userFromStore, location}) {
    const [film, setFilm] = useState();

    useEffect(() => {
        const getFilmInformation = () => {
            let filmFromFront = JSON.stringify(location.state.film);
            fetch(`http://localhost:3000/film?filmFromFront=${filmFromFront}`)
            .then(response => response.json())
            .then((jsonResponse) => {
                console.log(jsonResponse.populatedFilm)
                setFilm(jsonResponse.populatedFilm);
            })

        }
        getFilmInformation();
    },[])


    if(!userFromStore) {
        return ( <Redirect to='/' />)
    } else if(film === undefined) {
        return (
            <Container>
                <NavBar />
                {/* <h1 className='Title mt-4'>Star Wars Rebels Alliance Search System</h1> */}
                <h4 className='SubTitle mt-4'>This is {location.state.film.title}</h4>
                <h5 className='SubTitle mt-4'>Learn all there is to know about it in a few seconds <Spinner animation="border" /></h5>
            </Container>
        )
    } else {

        let peopleCards = film.characters.map((person, index)=>{
            return (
                <Col xs={12} md={4}>
                    <PersonCard key={index + person.name} person={person} />
                </Col>
                
            )
        })
        let planetCards = film.planets.map((planet, index)=>{
            return (
                <Col xs={12} md={4}>
                    <PlanetCard key={index + planet.name} planet={planet} />
                </Col>
                
            )
        })
        let specieCards = film.species.map((specie, index)=>{
            return (
                <Col xs={12} md={4}>
                    <SpecieCard key={index + specie.name} specie={specie} />
                </Col>
                
            )
        })
        let vehicleCards = film.vehicles.map((vehicle, index)=>{
            return (
                <Col xs={12} md={4}>
                    <VehicleCard key={index + vehicle.name} vehicle={vehicle} />
                </Col>
                
            )
        })
        let starshipCards = film.starships.map((starship, index)=>{
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
            <h4 className='SubTitle mt-4'>This is {film.title}</h4>
            <h5 className='SubTitle mt-4'>Learn all there is to know about it</h5>
            <Row className='display-flex flex-column mt-4'>
                <h6>Description :</h6>
                <p>
                    {film.title} was released {film.release_date} it was directeed by {film.director} and produced by {film.producer}.
                </p>
                <h6>Synopsis :</h6>
                <p>
                    {film.opening_crawl}
                </p>
                
            </Row>
            <Row className='display-flex flex-column mt-4'>
                <h6>Characters appearing :</h6>
                <Row>
                    {peopleCards}
                </Row>
            </Row>
            <Row className='display-flex flex-column mt-4'>
                <h6>Planets appearing :</h6>
                <Row>
                    {planetCards}
                </Row>
            </Row>
            <Row className='display-flex flex-column mt-4'>
                <h6>Species appearing :</h6>
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
  )(FilmDetails);
