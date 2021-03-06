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
import FilmCard from '../subComponents/cards/filmCard';
import PersonCard from '../subComponents/cards/personCard';

function PlanetDetails({userFromStore, location}) {
    const [planet, setPlanet] = useState();

    useEffect(() => {
        const getPlanetInformation = () => {
            let planetFromFront = JSON.stringify(location.state.planet);
            fetch(`http://localhost:3000/planet?planetFromFront=${planetFromFront}`)
            .then(response => response.json())
            .then((jsonResponse) => {
                setPlanet(jsonResponse.populatedPlanet);
            })

        }
        getPlanetInformation();
    },[])

    if(!userFromStore) {
        return ( <Redirect to='/' />)
    } else if(planet === undefined) {
        return(
            <Container>
                <NavBar />
                {/* <h1 className='Title mt-4'>Star Wars Rebels Alliance Search System</h1> */}
                <h4 className='SubTitle mt-4'>This is {location.state.planet.name}</h4>
                <h5 className='SubTitle mt-4'>Learn all there is to know about it in a few seconds <Spinner animation="border" /></h5>
            </Container>
        )
    } else {

        let filmCards = planet.films.map((film,index)=>{
            return (
                <Col xs={12} md={4}>
                    <FilmCard key={index + film.title} film={film} />
                </Col>
                
            )
        })
        let personCards = planet.residents.map((resident, index)=>{
            return (
                <Col xs={12} md={4}>
                    <PersonCard key={index + resident.name} person={resident} />
                </Col>
                
            )
        })
    return (
        <Container className='mb-5'>
        <NavBar />
            {/* <h1 className='Title mt-4'>Star Wars Rebels Alliance Search System</h1> */}
            <h4 className='SubTitle mt-4'>This is {planet.name}</h4>
            <h5 className='SubTitle mt-4'>Learn all there is to know about it</h5>
            <Row className='display-flex flex-column mt-4'>
                <h6>Description :</h6>
                <p>The planet {planet.name} has a {planet.climate} climate and it's terrain is mostly {planet.terrain}.
                It's diameter is {planet.diameter} km, the planet is {planet.surface_water}% water and it's gravity is {planet.gravity} compared to Earth.
                {planet.name} has an orbital period of {planet.orbital_period} days and it's rotation is done in {planet.rotation_period} hours.</p>
                
            </Row>
            <Row className='display-flex flex-column mt-4'>
                <h6>Films {planet.name} appeared in :</h6>
                <Row>
                    {filmCards}
                </Row>
            </Row>
            <Row className='display-flex flex-column mt-4'>
                <h6>Residents of {planet.name} :</h6>
                <Row>
                    {personCards}
                </Row>
            </Row>
            {/* <Masonry
                breakpointCols={3}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {filmCards}
            </Masonry> */}
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
  )(PlanetDetails);
