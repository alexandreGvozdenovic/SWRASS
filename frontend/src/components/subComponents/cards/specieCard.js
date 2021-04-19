import '../../../App.css';
// BOOTSTRAP
import Card from 'react-bootstrap/Card';
// REACT ROUTER
import { Link } from 'react-router-dom'

function SpecieCard({specie}) {
  return (
    <Card className='mt-4' style={{ width: '18rem', height: '18rem' }}>
      <Card.Body>
        <Card.Title>{specie.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{specie.classification}</Card.Subtitle>
        <Card.Text>
          Some trivia about this specie : <br/>
          Average height - {specie.average_height} cm <br/>
          Average lifespan - {specie.average_lifespan} years <br />
          Language - {specie.language} <br/>
        </Card.Text>
          <Link 
            to={{
              pathname: "/specie-details",
              state: { specie: specie }
              }}
          >
            Learn more
          </Link>
      </Card.Body>
    </Card>
)
}
  export default SpecieCard;