import React from 'react';
import {Link} from 'react-router-dom';
import './info-modal.css';


export default function InfoModal(props) {
    return (
        <section className="info-window">
            <h1>Welcome to Overwatch TeamBuilder!</h1>
            <h3>Objective</h3>
            <p>The main goal of Overwatch Team finder is to create a small community 
                of players to make it easy to find players of similar skill levels. This allows users
                 to find others of differing skillsets to form a well rounded team.</p>
            <h3>How it works</h3>
            <ul>
                <li>To register type in your skill rating (0-5000) and select the main roles and heroes 
                that you play.</li>
                <li>A player card will be generated for you that will be viewable by other users.</li>
                <li>Your information can be edited anytime by clicking on the Account tab.</li>
                <li>The players tab will
                allow you to browse other users of the site to help you find others that complement your skillset!</li>
            </ul>
                <Link to={props.link}><button className="login-button">Got it!</button></Link>
        </section>       
    ); 
}

// const mapStateToProps = state => {
//   return {
//     authToken: state.auth.authToken,
//     error: state.auth.error
//   }
// }

// export default withRouter(connect(mapStateToProps)(reduxForm({ 
//   form: 'login',
// })(Login)));
