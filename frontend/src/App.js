import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './components/page/login';
import Home from './components/page/home';
import Planets from './components/page/planets';

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
