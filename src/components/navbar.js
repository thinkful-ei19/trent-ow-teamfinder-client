import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import './navbar.css';
import { refreshPlayersTab } from '../actions/players';
import { logOut } from '../actions/auth';

function NavBar(props) {
    return (
      <nav className="topnav">
          <Link to='/view/players' onClick={() => props.dispatch(refreshPlayersTab())}>Players </Link>
          <Link className="nav-right" to='/' onClick={() => props.dispatch(logOut())}>Sign Out</Link>
          <Link className="nav-right" to='/view/account'>Account</Link>
      </nav>
    );
}

export default connect()(NavBar);