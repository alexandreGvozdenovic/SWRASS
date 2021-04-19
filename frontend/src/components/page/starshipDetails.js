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

function StarshipDetails({userFromStore, location}) {
    const [starship, setStarship] = useState();

    useEffect(() => {
        const getStarshipInformation = () => {
            let starshipFromFront = JSON.stringify(location.state.starship);
            fetch(`http://localhost:3000/starship?starshipFromFront=${starshipFromFront}`)
            .then(response => response.json())
            .then((jsonResponse) => {
                setStarship(jsonResponse.populatedStarship);
            })

        }
        getStarshipInformation();
    },[])

    if(!userFromStore) {
        return ( <Redirect to='/' />)
    } else if(starship === undefined) {
        return(
            <Container>
                <NavBar />
                {/* <h1 className='Title mt-4'>Star Wars Rebels Alliance Search System</h1> */}
                <h4 className='SubTitle mt-4'>This is the {location.state.starship.name}</h4>
                <h5 className='SubTitle mt-4'>Learn all there is to know about it in a few seconds <Spinner animation="border" /></h5>
            </Container>
        )
    } else {

        let filmCards = starship.films.map((film,index)=>{
            return (
                <Col xs={12} md={4}>
                    <FilmCard key={index + film.title} film={film} />
                </Col>
                
            )
        })
        let personCards = starship.pilots.map((pilot, index)=>{
            return (
                <Col xs={12} md={4}>
                    <PersonCard key={index + pilot.name} person={pilot} />
                </Col>
                
            )
        })
    return (
        <Container className='mb-5'>
            <NavBar />
            {/* <h1 className='Title mt-4'>Star Wars Rebels Alliance Search System</h1> */}
            <h4 className='SubTitle mt-4'>This is the {starship.name}</h4>
            <h5 className='SubTitle mt-4'>Learn all there is to know about it</h5>
            <Row className='display-flex flex-column mt-4'>
                <h6>Description :</h6>
                <p>The {starship.model} is a class {starship.starship_class} vehicle manufactured by {starship.manufacturer} with a top atmospherique speed of {starship.max_atmosphering_speed} km/h. It needs a crew of {starship.crew} to operate and can take up to {starship.passengers} passengers. The {starship.name}'s length is {starship.length} meters, it's cargo capacity is {starship.cargo_capacity} kg, it can provide it's crew for {starship.consumables} and it only costs {starship.cost_in_credits} credits. Concerning space travel the {starship.name} comes with a MGLT of {starship.MGLT} and an hyperdrive rating of {starship.hyperdrive_rating}.</p>
                
            </Row>
            <Row className='display-flex flex-column mt-4'>
                <h6>Films {starship.name} appeared in :</h6>
                <Row>
                    {filmCards}
                </Row>
            </Row>
            <Row className='display-flex flex-column mt-4'>
                <h6>Pilots of the {starship.name} :</h6>
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
  )(StarshipDetails);
