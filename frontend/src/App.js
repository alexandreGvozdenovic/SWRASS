// REACT ROUTER DOM
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
// My Components
import Login from './components/page/login';
import Home from './components/page/home';
import Planets from './components/page/planets';
import PlanetDetails from './components/page/planetDetails';
import People from './components/page/people';
import PersonDetails from './components/page/personDetails';
import Films from './components/page/films';
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
          <Route path='/films' component={Films} />



          {/* <Route path='/shop' component={Shop} />
          <Route path='/basket' component={Basket} />
          <Route path='/stripe-success' component={Success} />
          <Route path='/stripe-cancel' component={Cancel} />
          <Route path='/history' component={History}/>
          <Route path='/logout' component={Logout} /> */}
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
