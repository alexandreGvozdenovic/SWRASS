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
import StarshipCard from '../subComponents/cards/starshipCard';
// MASONRY
import Masonry from 'react-masonry-css';

function Starships({userFromStore}) {
    const [research, setResearch] = useState('');
    const [starships, setStarships] = useState([]);
    const [unfilteredStarships, setUnfilteredStarships] = useState([]);

    useEffect(()=>{
        const getStarships = () => {
            fetch(`http://localhost:3000/starships`)
            .then(response => response.json())
            .then((jsonResponse) => {
                let unsortedStarships = jsonResponse.starships;
                let sortedStarships = unsortedStarships.sort((a, b) => a.name.localeCompare(b.name));
                setStarships(sortedStarships);
                setUnfilteredStarships(sortedStarships);
            })

        }
        getStarships();
    },[])

    const handleSearch = () => {
        let filter = unfilteredStarships.filter((starship) => starship.name.toLocaleLowerCase().includes(research.toLocaleLowerCase()))
        setStarships(filter);
    }

    let cards = starships.map((starship, index) => {

        return(
            <StarshipCard key={index + starship.name} starship={starship} />
        )
    })
    if(!userFromStore) {
        return ( <Redirect to='/' />)
    }
  return (
    <Container className='mb-5'>
        <NavBar />
          {starships.length === 0 &&(
            <h4 className='SubTitle mt-4'>Starships are being retrieved from the database <Spinner animation="border" /></h4>
          )}
          {starships.length > 0 &&(
            <h4 className='SubTitle mt-4'>This is all the starships recorded from the database</h4>
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
                            placeholder="Death Star" 
                            value={research}
                            onChange={(e)=> {
                                setResearch(e.target.value);
                                }}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className='mr-2'>
                        Filter
                    </Button>
                    <Button variant="primary" onClick={() => setStarships(unfilteredStarships)}>
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
  )(Starships);
