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
import PersonCard from '../subComponents/cards/personCard';

function SpecieDetails({userFromStore, location}) {
    const [specie, setSpecie] = useState();

    useEffect(() => {
        const getSpecieInformation = () => {
            let specieFromFront = JSON.stringify(location.state.specie);
            fetch(`http://localhost:3000/specie?specieFromFront=${specieFromFront}`)
            .then(response => response.json())
            .then((jsonResponse) => {
                setSpecie(jsonResponse.populatedSpecie);
            })

        }
        getSpecieInformation();
    },[])


    if(!userFromStore) {
        return ( <Redirect to='/' />)
    } else if(specie === undefined) {
        return (
            <Container>
                <NavBar />
                {/* <h1 className='Title mt-4'>Star Wars Rebels Alliance Search System</h1> */}
                <h4 className='SubTitle mt-4'>This is the {location.state.specie.name} race</h4>
                <h5 className='SubTitle mt-4'>Learn all there is to know about them in a few seconds <Spinner animation="border" /></h5>
            </Container>
        )
    } else {
        let filmCards = specie.films.map((film, index)=>{
            return (
                <Col xs={12} md={4}>
                    <FilmCard key={index + film.title} film={film} />
                </Col>
                
            )
        })
        let peopleCards = specie.people.map((person, index)=>{
            return (
                <Col xs={12} md={4}>
                    <PersonCard key={index + person.name} person={person} />
                </Col>
                
            )
        })
    return (
        <Container className='mb-5'>
            <NavBar />
            {/* <h1 className='Title mt-4'>Star Wars Rebels Alliance Search System</h1> */}
            <h4 className='SubTitle mt-4'>This is the {specie.name} race</h4>
            <h5 className='SubTitle mt-4'>Learn all there is to know about them</h5>
            <Row className='display-flex flex-column mt-4'>
                <h6>Description :</h6>
                <p>
                    The {specie.name} is a {specie.classification} race, their average height is {specie.average_height} cm and they have an average lifespan of {specie.average_lifespan} years and their main language is the {specie.language}. Concerning looks they can have {specie.eye_colors} eyes, {specie.hair_colors} hairs and their skin can be {specie.skin_colors}. 
                </p>
                
            </Row>
            <Row className='display-flex flex-column mt-4'>
                <h6>Homeworld :</h6>
                <Row>
                    <Col>
                        <PlanetCard planet={specie.homeworld}/>
                    </Col>
                </Row>
            </Row>
            <Row className='display-flex flex-column mt-4'>
                <h6>Apparition in films :</h6>
                <Row>
                    {filmCards}
                </Row>
            </Row>
            <Row className='display-flex flex-column mt-4'>
                <h6>Known people :</h6>
                <Row>
                    {peopleCards}
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
  )(SpecieDetails);
