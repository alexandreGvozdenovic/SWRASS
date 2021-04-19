import '../../../App.css';
// BOOTSTRAP
import Card from 'react-bootstrap/Card';
// REACT ROUTER
import { Link } from 'react-router-dom'

function VehicleCard({vehicle}) {
  return (
    <Card className='mt-4' style={{ width: '18rem', height: '18rem' }}>
      <Card.Body>
        <Card.Title>{vehicle.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{vehicle.model}</Card.Subtitle>
        <Card.Text>
          Some trivia about this vehicle : <br/>
          Manufacturer - {vehicle.manufacturer} <br/>
          Cost - {vehicle.cost_in_credits} credits <br />
          Max speed - {vehicle.max_atmosphering_speed} km/h <br/>
        </Card.Text>
          <Link 
            to={{
              pathname: "/vehicle-details",
              state: { vehicle: vehicle }
              }}
          >
            Learn more
          </Link>
      </Card.Body>
    </Card>
)
}
  export default VehicleCard;
