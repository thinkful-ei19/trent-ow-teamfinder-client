import React from 'react';
import {Link} from 'react-router-dom';


function InfoModal(props) {
    return (
        <div className="login">
            <h1>Welcome to Overwatch <span className="orange">Team</span>Builder!</h1>
            <button className="login-button">Login</button>
            <h3>Don't have an Account? <Link to='/register'>Register</Link></h3>
        </div>       
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
