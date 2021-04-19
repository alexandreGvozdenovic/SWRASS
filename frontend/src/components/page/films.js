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
import FilmCard from '../subComponents/cards/filmCard';
// MASONRY
import Masonry from 'react-masonry-css';

function Films({userFromStore}) {
    const [research, setResearch] = useState('');
    const [films, setFilms] = useState([]);
    const [unfilteredFilms, setUnfilteredFilms] = useState([]);


    useEffect(()=>{
        const getFilms = () => {
            fetch(`http://localhost:3000/films`)
            .then(response => response.json())
            .then((jsonResponse) => {
                let unsortedFilms = jsonResponse.films;
                let sortedFilms = unsortedFilms.sort((a, b) => a.episode_id - b.episode_id)
                setFilms(sortedFilms);
                setUnfilteredFilms(sortedFilms);
            })

        }
        getFilms();
    },[])

    const handleSearch = () => {
        let filter = unfilteredFilms.filter((film) => film.title.toLocaleLowerCase().includes(research.toLocaleLowerCase()))
        setFilms(filter);
    }
    let cards = films.map((film,index)=> {

        return(
            <FilmCard key={index + film.title} film={film} />
        )
    })
    if(!userFromStore) {
        return ( <Redirect to='/' />)
    }
  return (
    <Container className='mb-5'>
        <NavBar />
          {/* <h1 className='Title mt-4'>Star Wars Rebels Alliance Search System</h1> */}
          {films.length === 0 &&(
            <h4 className='SubTitle mt-4'>Films are being retrieved from the database <Spinner animation="border" /></h4>
          )}
          {films.length > 0 &&(
            <h4 className='SubTitle mt-4'>This is all the films recorded from the database</h4>
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
                    <Form.Label className='mr-2'>Search by Title</Form.Label>
                    <Form.Control
                        className='mr-2'
                        type="text" 
                        placeholder="Return of the jedi" 
                        value={research}
                        onChange={(e)=> {
                            setResearch(e.target.value);
                            }}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className='mr-2'>
                    Filter
                </Button>
                <Button variant="primary" onClick={() => setFilms(unfilteredFilms)}>
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
  )(Films);
