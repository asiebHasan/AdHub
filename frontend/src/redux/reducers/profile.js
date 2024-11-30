// src/reducers/profile.js
import {
    FETCH_PROFILE_STARTED,
    FETCH_PROFILE_SUCCEEDED,
    FETCH_PROFILE_FAILED,
} from '../constants/profile';

const initialState = {
    loading: false,
    data: null,
    error: null,
};

export default function profileReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_PROFILE_STARTED:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_PROFILE_SUCCEEDED:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case FETCH_PROFILE_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}
