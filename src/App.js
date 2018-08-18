import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AppNavbar from './pages/components/AppNavbar';
import LoginForm from './pages/LoginForm';
import RegistrationForm from './pages/RegistrationForm';
import Dasboard from './pages/Dashboard';
import {Grid, Row} from 'react-bootstrap';
import {Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
          <AppNavbar />
          <Grid>
            <Row>
                <Route path='/registration' component={RegistrationForm} />
                <Route path='/dashboard/:uid' component={Dasboard} />
                <Route path='/' exact component={LoginForm} />
            </Row>
          </Grid>
      </div>
    );
  }
}

export default App;
