import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import AddUserForm from './components/add-user-form';
import PlayerTab from './components/player-tab';
import Login from './components/login';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path='/' component={Login} />
        <Route exact path='/register' component={AddUserForm}/>
        <Route exact path='/players' component={PlayerTab}/>
      </div>
    );
  }
}

export default App;
