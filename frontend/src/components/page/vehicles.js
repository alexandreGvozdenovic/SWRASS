import React, {useState, useEffect} from 'react';
import '../../App.css';
// BOOTSTRAP
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
// REDUX
import { connect } from 'react-redux'
// REACT ROUTER
import { Redirect } from 'react-router-dom'
// MY COMPONENTS
import NavBar from '../subComponents/navbar';
import VehicleCard from '../subComponents/cards/vehicleCard';
// MASONRY
import Masonry from 'react-masonry-css';

function Vehicles({userFromStore}) {
    const [research, setResearch] = useState('');
    const [vehicles, setVehicles] = useState([]);
    const [unfilteredVehicles, setUnfilteredVehicles] = useState([]);

    useEffect(()=>{
        const getVehicles = () => {
            fetch(`http://localhost:3000/vehicles`)
            .then(response => response.json())
            .then((jsonResponse) => {
                let unsortedVehicles = jsonResponse.vehicles;
                let sortedVehicles = unsortedVehicles.sort((a, b) => a.name.localeCompare(b.name));
                setVehicles(sortedVehicles);
                setUnfilteredVehicles(sortedVehicles);
            })

        }
        getVehicles();
    },[])

    const handleSearch = () => {
        let filter = unfilteredVehicles.filter((vehicle) => vehicle.name.toLocaleLowerCase().includes(research.toLocaleLowerCase()))
        setVehicles(filter);
    }

    let cards = vehicles.map((vehicle, index) => {

        return(
            <VehicleCard key={index + vehicle.name} vehicle={vehicle} />
        )
    })
    if(!userFromStore) {
        return ( <Redirect to='/' />)
    }
  return (
        <Container className='mb-5'>
        <NavBar />
          {vehicles.length === 0 &&(
            <h4 className='SubTitle mt-4'>Vehicles are being retrieved from the database <Spinner animation="border" /></h4>
          )}
          {vehicles.length > 0 &&(
            <h4 className='SubTitle mt-4'>This is all the vehicles recorded from the database</h4>
          )}
            <Row className='justify-content-center mt-5'>
                <Form
                    inline 
                    onSubmit={(e)=> {
                        e.preventDefault();
                        handleSearch();

                    }}
                >
                    <Form.Group controlId="formResearch">
                        <Form.Label className='mr-2'>Search by name</Form.Label>
                        <Form.Control
                            className='mr-2'
                            type="text" 
                            placeholder="AT-AT" 
                            value={research}
                            onChange={(e)=> {
                                setResearch(e.target.value);
                                }}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className='mr-2'>
                        Filter
                    </Button>
                    <Button variant="primary" onClick={() => setVehicles(unfilteredVehicles)}>
                        Reset
                    </Button>
                </Form>
            </Row>
          <Masonry
            breakpointCols={3}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
              {cards}
          </Masonry>
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
  )(Vehicles);
