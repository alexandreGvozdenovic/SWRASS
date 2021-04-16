// REACT ROUTER DOM
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
// My Components
import Login from './components/page/login';
import Home from './components/page/home';
import Planets from './components/page/planets';
import PlanetDetails from './components/page/planetDetails';
import People from './components/page/people';
import PersonDetails from './components/page/personDetails';
import Species from './components/page/species';
import SpecieDetails from './components/page/specieDetails';
import Films from './components/page/films';
import FilmDetails from './components/page/filmDetails';
import Vehicles from './components/page/vehicles';
import VehicleDetails from './components/page/vehicleDetails';
import Starships from './components/page/starships';
import StarshipDetails from './components/page/starshipDetails';
// Redux
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import user from './reducers/user.reducer';
const store = createStore(combineReducers({user}))

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path='/' exact component={Login} />
          <Route path='/home' component={Home} />
          <Route path='/planets' component={Planets} />
          <Route path='/planet-details' component={PlanetDetails} />
          <Route path='/people' component={People} />
          <Route path='/person-details' component={PersonDetails} />
          <Route path='/species' component={Species} />
          <Route path='/specie-details' component={SpecieDetails} />
          <Route path='/films' component={Films} />
          <Route path='/film-details' component={FilmDetails} />
          <Route path='/vehicles' component={Vehicles} />
          <Route path='/vehicle-details' component={VehicleDetails} />
          <Route path='/starships' component={Starships} />
          <Route path='/starship-details' component={StarshipDetails} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
