import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import './navbar.css';
import { refreshPlayersTab } from '../actions/players';
import { logOut } from '../actions/auth';
import { toggleDisplayNav, hideDisplayNav } from '../actions/navbar';

function NavBar(props) {
    return (
      <nav className="topnav">
        <div className="navbar-link-toggle" onClick={() => props.dispatch(toggleDisplayNav())}>
            <i className="fas fa-bars"></i>
        </div>
        <div className={props.isDisplayed ? "navbar-items navbar-toggle-show" : "navbar-items"}>
            <Link onClick={() => props.dispatch(hideDisplayNav())} to='/view/info'><span className="orange">Team</span>Builder</Link>
            <Link to='/view/players' 
                onClick={() => {
                  props.dispatch(hideDisplayNav())
                  return props.dispatch(refreshPlayersTab())}}>Players </Link>
        </div>
        <div className={props.isDisplayed ? "navbar-items nav-right navbar-toggle-show" : "navbar-items nav-right"}>
            <Link to='/' 
              onClick={() => {
                props.dispatch(hideDisplayNav())
                return props.dispatch(logOut())}}>Sign Out</Link>
            <Link onClick={() => props.dispatch(hideDisplayNav())} to='/view/account'>Account</Link>
        </div>

      </nav>
    );
}

const mapStateToProps = state => {
    return {
        isDisplayed: state.navBar.isDisplayed
    }
}

export default connect(mapStateToProps)(NavBar);