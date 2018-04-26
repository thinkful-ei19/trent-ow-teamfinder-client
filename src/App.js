import React, { Component } from 'react';
import AddUserForm from './components/add-user-form';
import PlayerTab from './components/player-tab';
import Login from './components/login';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Login/>
        <AddUserForm/>
        <PlayerTab/>
      </div>
    );
  }
}

export default App;
