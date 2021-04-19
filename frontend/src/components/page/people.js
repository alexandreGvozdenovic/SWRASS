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
import PersonCard from '../subComponents/cards/personCard';
// MASONRY
import Masonry from 'react-masonry-css';

function People({userFromStore}) {
    const [research, setResearch] = useState('');
    const [people, setPeople] = useState([]);
    const [unfilteredPeople, setUnfilteredPeople] = useState([]);

    useEffect(()=>{
        const getPeople = () => {
            fetch(`http://localhost:3000/people`)
            .then(response => response.json())
            .then((jsonResponse) => {
                let unsortedPeople = jsonResponse.people;
                let sortedPeople = unsortedPeople.sort((a, b) => a.name.localeCompare(b.name))
                setPeople(sortedPeople);
                setUnfilteredPeople(sortedPeople);
            })

        }
        getPeople();
    },[])

    const handleSearch = () => {
        let filter = unfilteredPeople.filter((person) => person.name.toLocaleLowerCase().includes(research.toLocaleLowerCase()))
        setPeople(filter);
    }

    let cards = people.map((person,index)=> {

        return(
            <PersonCard key={index + person.name} person={person} />
        )
    })
    if(!userFromStore) {
        return ( <Redirect to='/' />)
    }
  return (
    <Container className='mb-5'>
    <NavBar />
          {people.length === 0 &&(
            <h4 className='SubTitle mt-4'>People are being retrieved from the database <Spinner animation="border" /></h4>
          )}
          {people.length > 0 &&(
            <h4 className='SubTitle mt-4'>This is all the people recorded from the database</h4>
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
                    <Form.Label className='mr-2'>Search by Name</Form.Label>
                    <Form.Control
                        className='mr-2'
                        type="text" 
                        placeholder="Anakin" 
                        value={research}
                        onChange={(e)=> {
                            setResearch(e.target.value);
                            }}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className='mr-2'>
                    Filter
                </Button>
                <Button variant="primary" onClick={() => setPeople(unfilteredPeople)}>
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
  )(People);
