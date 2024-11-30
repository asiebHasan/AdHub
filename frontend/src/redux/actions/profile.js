import axios from 'axios';
import { FETCH_PROFILE_STARTED, FETCH_PROFILE_SUCCEEDED, FETCH_PROFILE_FAILED } from '../constants/profile';

export const fetchProfileStarted = () => ({
    type: FETCH_PROFILE_STARTED,
});

export const fetchProfileSucceeded = (profile) => ({
    type: FETCH_PROFILE_SUCCEEDED,
    payload: profile,
});

export const fetchProfileFailed = (error) => ({
    type: FETCH_PROFILE_FAILED,
    payload: error,
});

// Thunk to fetch the profile
export const fetchProfile = () => async (dispatch, getState) => {
    dispatch(fetchProfileStarted());
    const { token } = getState().auth; // Get token from auth state

    try {
        const response = await axios.get('http://localhost:8000/api/auth/profile/', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        dispatch(fetchProfileSucceeded(response.data));
    } catch (error) {
        dispatch(fetchProfileFailed(error.response?.data || error.message));
    }
};