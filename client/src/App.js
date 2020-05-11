import React, { Fragment, useEffect } from 'react';

// Styling
import 'bootstrap/dist/css/bootstrap.min.css';

// Routing

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { getUser } from './auth/authSlice';

// Routing
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './auth/PrivateRoute';

// Components
import Navbar from './layout/Navbar';
import Landing from './layout/Landing';
import Login from './auth/Login';
import Register from './auth/Register';
import Dashboard from './users/Dashboard';

function App() {
  useEffect(() => {
    store.dispatch(getUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
