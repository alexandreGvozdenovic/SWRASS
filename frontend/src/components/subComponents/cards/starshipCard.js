import '../../../App.css';
// BOOTSTRAP
import Card from 'react-bootstrap/Card';
// REACT ROUTER
import { Link } from 'react-router-dom'

function StarshipCard({starship}) {
  return (
    <Card className='mt-4' style={{ width: '18rem', height: '18rem' }}>
      <Card.Body>
        <Card.Title>{starship.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{starship.model}</Card.Subtitle>
        <Card.Text>
          Some trivia about this starship : <br/>
          Manufacturer - {starship.manufacturer} <br/>
          Cost - {starship.cost_in_credits} credits <br />
          Max atmospherique speed - {starship.max_atmosphering_speed} km/h <br/>
        </Card.Text>
          <Link 
            to={{
              pathname: "/starship-details",
              state: { starship: starship }
              }}
          >
            Learn more
          </Link>
      </Card.Body>
    </Card>
)
}
  export default StarshipCard;