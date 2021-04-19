import '../../../App.css';
// BOOTSTRAP
import Card from 'react-bootstrap/Card';
// REACT ROUTER
import { Link } from 'react-router-dom'

function PersonCard({person}) {
  return (
    <Card className='mt-4' style={{ width: '18rem', height: '22rem' }}>
      <Card.Body>
        <Card.Title>{person.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Gender : {person.gender}</Card.Subtitle>
        <Card.Text>
          Some trivia about {person.name} : <br/>
          Year of birth - {person.birth_year} <br/>
          Eyes color - {person.eye_color} <br />
          Hair color - {person.hair_color} <br/>
          Height - {person.height} cm <br/>
          Mass - {person.mass} kg <br/>
          Skin color - {person.skin_color} <br/>
        </Card.Text>
          <Link 
            to={{
              pathname: "/person-details",
              state: { person: person }
              }}
          >
            Learn more
          </Link>
      </Card.Body>
    </Card>
)
}
  export default PersonCard;
