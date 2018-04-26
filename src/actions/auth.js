// import jwtDecode from 'jwt-decode';
import {SubmissionError} from 'redux-form';

import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';
// import { clearAuthToken, saveAuthToken} from '../local-storage';

export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
export const setAuthToken = authToken => ({
    type: SET_AUTH_TOKEN,
    authToken
});

const storeAuthInfo = (authToken, dispatch) => {
    // const decodedToken = jwtDecode(authToken);
    dispatch(setAuthToken(authToken));
};

export const login = (username, password) => dispatch => {
    // dispatch(authRequest());
    return (
        fetch(`${API_BASE_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })
            // Reject any requests which don't return a 200 status, creating
            // errors which follow a consistent format
            .then(res => normalizeResponseErrors(res))
            .then(res => res.json())
            .then(({authToken}) => {
                storeAuthInfo(authToken, dispatch);
                
            })
            .catch(err => {
                const {code} = err;
                const message =
                    code === 401
                        ? 'Incorrect username or password'
                        : 'Unable to login, please try again';
                // dispatch(authError(err));
                // Could not authenticate, so return a SubmissionError for Redux
                // Form
                return Promise.reject(
                    new SubmissionError({
                        _error: message
                    })
                );
            })
    );
};