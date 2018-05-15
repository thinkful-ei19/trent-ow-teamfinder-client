import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import './landing-page.css';
import {hideDisplayNav, toggleDisplayNav} from '../actions/navbar';

class LandingPage extends React.Component {
    
    render () {
        return (
            <header className="landing-page">
                <nav className="topnav">
                    <div className="navbar-brand">
                        <Link onClick={() => this.props.dispatch(hideDisplayNav())} to='/view/info'><span className="orange">Team</span>Builder</Link>
                    </div>
                    <div className="navbar-link-toggle" onClick={() => this.props.dispatch(toggleDisplayNav())}>
                        <i className="fas fa-bars"></i>
                    </div>
                    <div className={this.props.isDisplayed ? "navbar-items nav-right navbar-toggle-show" : "navbar-items nav-right"}>
                        <Link onClick={() => this.props.dispatch(hideDisplayNav())} to='/register'>Sign Up</Link>
                        <Link to='/login' 
                            onClick={() => this.props.dispatch(hideDisplayNav())}>Sign in</Link>
                    </div>
                </nav>
                <div className="background-img">
                    <h1>Group Better. Combo Harder. Play Smarter.</h1>
              </div>
            </header>
        );
    }
}

const mapStateToProps = state => {
    return {
        isDisplayed: state.navBar.isDisplayed
    }
}

export default connect(mapStateToProps)(LandingPage);