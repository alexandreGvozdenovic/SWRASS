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
import Spinner from 'react-bootstrap/Spinner';
// REDUX
import { connect } from 'react-redux'
// REACT ROUTER
import { Redirect } from 'react-router-dom'
// MY COMPONENTS
import CustomList from '../subComponents/list';
import NavBar from '../subComponents/navbar';
// MASONRY
import Masonry from 'react-masonry-css';

function Home({userFromStore}) {
    const [research, setResearch] = useState('');
    const [spinner, setSpinner] = useState({display:'none'})
    const [films, setFilms] = useState([]);
    const [people, setPeople] = useState([]);
    const [planets, setPlanets] = useState([]);
    const [species, setSpecies] = useState([]);
    const [starships, setStarships] = useState([]);
    const [vehicles, setVehicles] = useState([]);

    const handleSubmit = () => {
        fetch(`http://localhost:3000/search?search=${research}`)
        .then(response => response.json())
        .then((jsonResponse) => {
            console.log(jsonResponse)
            setFilms(jsonResponse.films);
            setPeople(jsonResponse.people);
            setPlanets(jsonResponse.planets);
            setSpecies(jsonResponse.species);
            setStarships(jsonResponse.starships);
            setVehicles(jsonResponse.vehicles);
            setSpinner({display:'none'})
        })
    }

    if(!userFromStore) {
        return ( <Redirect to='/' />)
    }
  return (
      <Container>
        <NavBar />
          {/* <h1 className='Title mt-4'>Star Wars Rebels Alliance Search System</h1> */}
          <h4 className='SubTitle mt-4'>Welcome {userFromStore.name}</h4>
          <Row className='justify-content-center mt-5'>
            <Form
                inline 
                onSubmit={(e)=> {
                    setSpinner(null);
                    handleSubmit();
                    e.preventDefault();
                }}
            >
                <Form.Group controlId="formBasicEmail">
                    <Form.Label className='mr-2'>Search for anything</Form.Label>
                    <Form.Control
                        className='mr-2'
                        type="text" 
                        placeholder="Death Star, Pew Pew" 
                        value={research}
                        onChange={(e)=> setResearch(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className='mr-2'>
                    Submit
                </Button>
                <Spinner animation="border" style={spinner} />
            </Form>
          </Row>
          <Masonry
            breakpointCols={3}
            className="my-masonry-grid mt-4"
            columnClassName="my-masonry-grid_column"
          >
              <div className='mt-4'>
                <h5>Films</h5>
                <ListGroup>
                    {films.length > 0 ? <CustomList array={films} type='films' /> : 'No results'}
                </ListGroup>
              </div>
              <div className='mt-4'>
              <h5>Species</h5>
                <ListGroup>
                    {species.length > 0 ? <CustomList array={species} type='species' /> : 'No results'}
                </ListGroup>
              </div>
              <div className='mt-4'>
                <h5>Planets</h5>
                <ListGroup>
                    {planets.length > 0 ? <CustomList array={planets} type='planets' /> : 'No results'}
                </ListGroup>
              </div>
              <div className='mt-4'>
                <h5>Vehicles</h5>
                <ListGroup>
                    {vehicles.length > 0 ? <CustomList array={vehicles} type='vehicles' /> : 'No results'}
                </ListGroup>
              </div>
              <div className='mt-4'>
                <h5>Starships</h5>
                <ListGroup>
                    {starships.length > 0 ? <CustomList array={starships} type='starships' /> : 'No results'}
                </ListGroup>
              </div>
              <div className='mt-4'>
                <h5>People</h5>
                <ListGroup>
                    {people.length > 0 ? <CustomList array={people} type='people' /> : 'No results'}
                </ListGroup>
              </div>

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
  )(Home);
