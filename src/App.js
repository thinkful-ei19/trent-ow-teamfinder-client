import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import AddUserForm from './components/add-user-form';
import PlayerTab from './components/player-tab';
import Login from './components/login';
import NavBar from './components/navbar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path='/auth' component={NavBar}/>
        <Route exact path='/' component={Login} />
        <Route exact path='/register' component={AddUserForm}/>
        <Route exact path='/auth/players' component={PlayerTab}/>
      </div>
    );
  }
}

export default App;
