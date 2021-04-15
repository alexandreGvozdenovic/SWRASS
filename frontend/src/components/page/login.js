import React, {useState} from 'react';
import '../../App.css';
// BOOTSTRAP
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form';
// REDUX
import { connect } from 'react-redux'
// REACT ROUTER
import { Redirect } from 'react-router-dom'

function Login({authorizedUser, userFromStore}) {
    const [identification, setIdentification] = useState('');
    // console.log(identification);
    console.log('USER FROM STORE', userFromStore);
    const [password, setPassword] = useState('');
    const [authorized, setAuthorized] = useState(false);

    const handleSignIn = () => {
        fetch('http://localhost:3000/sign-in',{
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `identificationFromFront=${identification}&passwordFromFront=${password}`
        })
        .then((response) => {
            return response.json();
        })
        .then((jsonResponse) => {
            console.log(jsonResponse);
            if(jsonResponse.authorized){
                authorizedUser(jsonResponse.name);
                setAuthorized(true);
            }
        })
        .catch((error)=>{
            console.log('ERROR ===> ',error);
        })


    }

  if (authorized) {
      return ( <Redirect to='/home' />)
  }
  return (
      <Container>
          <h1 className='Title mt-4'>Star Wars Rebels Alliance Search System</h1>
          <h4 className='SubTitle mt-4'>Please identify yourself to access the system</h4>
          <Row className='justify-content-center mt-5'>
            <Form 
                className='w-50' 
                onSubmit={(e)=> {
                    console.log(identification,' ',password);
                    handleSignIn();
                    e.preventDefault();
                }}
            >
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Identification</Form.Label>
                    <Form.Control
                        type="text" 
                        placeholder="Enter identification" 
                        value={identification}
                        onChange={(e)=> setIdentification(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
          </Row>
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
  )(Login);
