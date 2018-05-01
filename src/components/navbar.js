import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import './navbar.css';
import { refreshPlayersTab } from '../actions/players';

function NavBar(props) {
    return (
      <nav className="topnav">
          <Link to='/auth/players' onClick={() => props.dispatch(refreshPlayersTab())}>Players </Link>
          <Link className="nav-right" to='/auth/account'>Account</Link>
      </nav>
    );
}

export default connect()(NavBar);