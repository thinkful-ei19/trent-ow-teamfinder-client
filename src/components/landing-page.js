import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import './landing-page.css';
import {hideDisplayNav, toggleDisplayNav} from '../actions/navbar';

class LandingPage extends React.Component {
    
    render () {
        return (
            <div>
                <header className="landing-page">
                    <nav className="topnav landing-nav">
                        <div className="navbar-brand">
                            <Link onClick={() => this.props.dispatch(hideDisplayNav())} to='/'><span className="orange">Team</span>Builder</Link>
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
                        <div className="header-text">
                            <h1>GROUP BETTER. COMBO HARDER. PLAY SMARTER</h1>
                            <p>The platform for finding teammates with the skillsets you need.</p>
                            <Link to="/register"><button className="landing-button">Sign Up Now!</button></Link>
                        </div>
                    </div>
                </header>
                <section className="feature-desc">
                    
                </section>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isDisplayed: state.navBar.isDisplayed
    }
}

export default connect(mapStateToProps)(LandingPage);