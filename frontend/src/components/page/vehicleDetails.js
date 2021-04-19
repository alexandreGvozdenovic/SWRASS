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

function VehicleDetails({userFromStore, location}) {
    const [vehicle, setVehicle] = useState();
    useEffect(() => {
        const getVehicleInformation = () => {
            let vehicleFromFront = JSON.stringify(location.state.vehicle);
            fetch(`http://localhost:3000/vehicle?vehicleFromFront=${vehicleFromFront}`)
            .then(response => response.json())
            .then((jsonResponse) => {
                setVehicle(jsonResponse.populatedVehicle);
            })

        }
        getVehicleInformation();
    },[])

    if(!userFromStore) {
        return ( <Redirect to='/' />)
    } else if(vehicle === undefined) {
        return(
            <Container>
                <NavBar />
                {/* <h1 className='Title mt-4'>Star Wars Rebels Alliance Search System</h1> */}
                <h4 className='SubTitle mt-4'>This is the {location.state.vehicle.name}</h4>
                <h5 className='SubTitle mt-4'>Learn all there is to know about it in a few seconds <Spinner animation="border" /></h5>
            </Container>
        )
    } else {

        let filmCards = vehicle.films.map((film,index)=>{
            return (
                <Col xs={12} md={4}>
                    <FilmCard key={index + film.title} film={film} />
                </Col>
                
            )
        })
        let personCards = vehicle.pilots.map((pilot, index)=>{
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
            <h4 className='SubTitle mt-4'>This is the {vehicle.name}</h4>
            <h5 className='SubTitle mt-4'>Learn all there is to know about it</h5>
            <Row className='display-flex flex-column mt-4'>
                <h6>Description :</h6>
                <p>The {vehicle.model} is a class {vehicle.vehicle_class} vehicle manufactured by {vehicle.manufacturer} with a top atmospherique speed of {vehicle.max_atmosphering_speed} km/h. It needs a crew of {vehicle.crew} to operate and can take up to {vehicle.passengers} passengers. The {vehicle.name}'s length is {vehicle.length} meters, it's cargo capacity is {vehicle.cargo_capacity} kg, it can provide it's crew for {vehicle.consumables} and it only costs {vehicle.cost_in_credits} credits. </p>
                
            </Row>
            <Row className='display-flex flex-column mt-4'>
                <h6>Films {vehicle.name} appeared in :</h6>
                <Row>
                    {filmCards}
                </Row>
            </Row>
            <Row className='display-flex flex-column mt-4'>
                <h6>Pilots of the {vehicle.name} :</h6>
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
  )(VehicleDetails);
