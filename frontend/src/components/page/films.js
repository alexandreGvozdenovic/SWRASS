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
import PersonCard from '../subComponents/cards/personCard';
import FilmCard from '../subComponents/cards/filmCard';
// MASONRY
import Masonry from 'react-masonry-css';

function Films({userFromStore}) {
    const [research, setResearch] = useState('');
    const [films, setFilms] = useState([]);

    useEffect(()=>{
        const getFilms = () => {
            fetch(`http://localhost:3000/films`)
            .then(response => response.json())
            .then((jsonResponse) => {
                console.log(jsonResponse)
                let unsortedFilms = jsonResponse.films;
                let sortedFilms = unsortedFilms.sort((a, b) => a.episode_id - b.episode_id)
                setFilms(sortedFilms);
            })

        }
        getFilms();
    },[])

    let cards = films.map((film,index)=> {

        return(
            <FilmCard key={index + film.title} film={film} />
        )
    })
    if(!userFromStore) {
        return ( <Redirect to='/' />)
    }
  return (
      <Container>
          <NavBar />
          {/* <h1 className='Title mt-4'>Star Wars Rebels Alliance Search System</h1> */}
          <h4 className='SubTitle mt-4'>This is all the films recorded from the database</h4>

          {/* <Row className='justify-content-center mt-5'>
            <Form
                inline 
                onSubmit={(e)=> {
                    console.log(research);
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
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
          </Row> */}
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
  )(Films);
