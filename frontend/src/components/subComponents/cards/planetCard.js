import '../../../App.css';
// BOOTSTRAP
import Card from 'react-bootstrap/Card';
// REACT ROUTER
import { Link } from 'react-router-dom'

function PlanetCard({planet}) {
  return (
    <Card className='mt-4' style={{ width: '18rem', height: '18rem' }}>
      <Card.Body>
        <Card.Title>{planet.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{planet.climate}</Card.Subtitle>
        <Card.Text>
          Some trivia about the planet : <br/>
          Diameter - {planet.diameter}km <br/>
          Gravity - {planet.gravity} <br />
          Orbital period - {planet.orbital_period} days <br/>
          Population - {planet.population} <br/>
        </Card.Text>
          <Link 
            to={{
              pathname: "/planet-details",
              state: { planet: planet }
              }}
          >
            Learn more
          </Link>
      </Card.Body>
    </Card>
)
}
  export default PlanetCard;
