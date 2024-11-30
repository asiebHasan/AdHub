import axios from 'axios';
import { LOGIN_STARTED, LOGIN_SUCCEEDED, LOGIN_FAILED, LOGOUT, REGISTER_STARTED, REGISTER_SUCCEEDED, REGISTER_FAILED } from '../constants/auth';

export const loginStarted = () => ({
    type: LOGIN_STARTED,
});

export const loginSucceeded = (token, user) => ({
    type: LOGIN_SUCCEEDED,
    payload: { token, user },
});

export const loginFailed = (error) => ({
    type: LOGIN_FAILED,
    payload: error,
});

export const registerRequested = () => ({
    type: REGISTER_STARTED,
});

export const registerSucceeded = (token, user) => ({
    type: REGISTER_SUCCEEDED,
    payload: { token, user },
});

export const registerFailed = (error) => ({
    type: REGISTER_FAILED,
    payload: error,
});

export const logoutAction = () => ({
    type: LOGOUT,
});

export const login = (email, password) => async (dispatch) => {
    dispatch(loginStarted());

    try {
        const response = await axios.post(
            'http://127.0.0.1:8000/api/auth/token/',
            { email, password },
            { headers: { 'Content-Type': 'application/json' } }
        );

        // Extract token and user (if user data is returned in response)
        const { access: token, user } = response.data;

        // Store token in local storage
        localStorage.setItem('token', token);

        dispatch(loginSucceeded(token, user));
    } catch (error) {
        // Extract meaningful error message from the API response
        console.log(error)
        const errorMessage = error.response?.data?.detail || 'Login failed. Please try again.';

        dispatch(loginFailed(errorMessage));
    }
};

export const logout = () => (dispatch) => {
    // Clear token from local storage
    localStorage.removeItem('token');
    dispatch(logoutAction());
};

export const register = (email, first_name, last_name, phone_no, password, password2) => async (dispatch) => {
    dispatch(registerRequested());

    try {
        const validData = {
            email: email,
            first_name: first_name,
            last_name: last_name,
            phone_no: phone_no,
            password: password,
            password2: password2,

        };
        const response = await axios.post(
            'http://127.0.0.1:8000/api/auth/register/',
            validData,
            { headers: { 'Content-Type': 'application/json' } }
        );

        // Extract token and user (if user data is returned in response)
        const { access: token, user } = response.data;

        // Store token in local storage
        localStorage.setItem('token', token);

        dispatch(registerSucceeded(token, user));


    } catch (error) {
        // Extract meaningful error message from the API response
        console.log(error)
        const errorMessage = error.response?.data?.detail || 'Registration failed. Please try again.';

        dispatch(registerFailed(errorMessage));
    }
}