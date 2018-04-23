import React, { Component } from 'react';
import './App.css';
import AddUserForm from './components/add-user-form';
import PlayerTab from './components/player-tab';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AddUserForm/>
        <PlayerTab/>
      </div>
    );
  }
}

export default App;
