import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return{
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (authData) => {
    return{
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    };
};

export const authFail = (error) => {
    return{
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const Auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        let Url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCBvlmMsFGL4iU0d4nvIMLBtP5JLUHkEl4";
        if(!isSignUp){
            Url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCBvlmMsFGL4iU0d4nvIMLBtP5JLUHkEl4";
        }
        axios.post(Url, authData)
             .then(Response => {
                 console.log(Response);
                 dispatch(authSuccess(Response.data))
             })
             .catch(err => {
                 console.log(err);
                 dispatch(authFail());
             })
    };
};