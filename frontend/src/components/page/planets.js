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
import PlanetCard from '../subComponents/cards/planetCard';
// MASONRY
import Masonry from 'react-masonry-css';

function Planets({userFromStore}) {
    const [research, setResearch] = useState('');
    const [planets, setPlanets] = useState([]);
    const [unfilteredPlanets, setUnfilteredPlanets] = useState([]);

    useEffect(()=>{
        const getPlanets = () => {
            fetch(`http://localhost:3000/planets`)
            .then(response => response.json())
            .then((jsonResponse) => {
                let unsortedPlanets = jsonResponse.planets;
                let sortedPlanets = unsortedPlanets.sort((a, b) => a.name.localeCompare(b.name))
                setPlanets(sortedPlanets);
                setUnfilteredPlanets(sortedPlanets);
            })

        }
        getPlanets();
    },[])

    const handleSearch = () => {
        let filter = unfilteredPlanets.filter((planet) => planet.name.toLocaleLowerCase().includes(research.toLocaleLowerCase()))
        setPlanets(filter);
    }

    let cards = planets.map((planet,index)=> {

        return(
            <PlanetCard key={index + planet.name} planet={planet} />
        )
    })
    if(!userFromStore) {
        return ( <Redirect to='/' />)
    }
  return (
    <Container className='mb-5'>
    <NavBar />
          {planets.length === 0 &&(
            <h4 className='SubTitle mt-4'>Planets are being retrieved from the database <Spinner animation="border" /></h4>
          )}
          {planets.length > 0 &&(
            <h4 className='SubTitle mt-4'>This is all the planets recorded from the database</h4>
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
                            placeholder="Tatooine" 
                            value={research}
                            onChange={(e)=> {
                                setResearch(e.target.value);
                                }}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className='mr-2'>
                        Filter
                    </Button>
                    <Button variant="primary" onClick={() => setPlanets(unfilteredPlanets)}>
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
  )(Planets);
