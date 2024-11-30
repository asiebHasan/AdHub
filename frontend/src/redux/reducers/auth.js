import { LOGIN_STARTED, LOGIN_SUCCEEDED, LOGIN_FAILED, LOGOUT,
    REGISTER_STARTED, REGISTER_SUCCEEDED, REGISTER_FAILED
 } from '../constants/auth';

const initialState = {
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
    user: localStorage.getItem('user') || null,
    loading: false,
    error: null,
};

export default function authReducer(state = initialState, action){
    switch(action.type){
        case LOGIN_STARTED:
            return {
                ...state,
                loading: true,
                error: null
            };
        
        case LOGIN_SUCCEEDED:
            return{
                ...state,
                token: action.payload.token,
                isAuthenticated: true,
                loading: false,
                error: null,
            };
        
        case LOGIN_FAILED:
            return{
                ...state,
                token: null,
                isAuthenticated: false, 
                loading:false,
                error: action.payload,
            };

        case LOGOUT:
            return{
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                error: null
            };
        
        
        case REGISTER_STARTED:
            return {
                ...state,
                loading: true,
                error: null
            };
        
        case REGISTER_SUCCEEDED:
            return{
                ...state,
                token: action.payload.token,
                isAuthenticated: true,
                loading: false,
                error: null,
            };
        
        case REGISTER_FAILED:
            return{
                ...state,
                token: null,
                isAuthenticated: false, 
                loading:false,
                error: action.payload,
            };
        
        default:
            return state;
    }
}