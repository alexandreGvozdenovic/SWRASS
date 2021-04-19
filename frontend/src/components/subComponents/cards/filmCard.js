import '../../../App.css';
// BOOTSTRAP
import Card from 'react-bootstrap/Card';
// REACT ROUTER
import { Link } from 'react-router-dom'

function FilmCard({film}) {
  return (
    <Card className='mt-4' style={{ width: '18rem', height: '18rem' }}>
      <Card.Body>
        <Card.Title>{film.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Episode {film.episode_id}</Card.Subtitle>
        <Card.Text>
          Some trivia about the film : <br/>
          Director - {film.director} <br/>
          Producer - {film.producer} <br />
          Release date - {film.release_date} <br/>
        </Card.Text>
          <Link 
            to={{
              pathname: "/film-details",
              state: { film: film }
              }}
          >
            Learn more
          </Link>
      </Card.Body>
    </Card>
)
}
  export default FilmCard;
