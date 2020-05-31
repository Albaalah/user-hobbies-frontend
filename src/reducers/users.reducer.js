import {createRoutine} from 'redux-saga-routines'

export const getUsers = createRoutine('GET_USERS');
export const addUser = createRoutine('ADD_USER');

export default (state, action) => {
    switch (action.type) {
        // get All Users
        case getUsers.TRIGGER:
            return {
                ...state,
                error: false,
                loading: true,
                successRes: false,
                message: '',
                users: []
            };
        case getUsers.SUCCESS:
            return {
                ...state,
                error: false,
                loading: false,
                successRes: true,
                message: '',
                users: action.payload.users
            };
        case getUsers.FAILURE:
            return {
                ...state,
                error: true,
                loading: false,
                successRes: false,
                message: action.payload,
                users: []
            };
        //add a user
        case addUser.TRIGGER:
            return {...state, loading: true, adding: true, error: false, successRes: false};
        case addUser.SUCCESS:
            return {
                ...state,
                adding: false,
                successRes: true,
                error: false,
                loading: false,
            };
        case addUser.FAILURE:
            return {
                ...state,
                adding: false,
                successRes: false,
                loading: false,
                error: true
            };
        default:
            return {...state}
    }
}
