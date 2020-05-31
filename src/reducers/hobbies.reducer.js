import {createRoutine} from 'redux-saga-routines'

export const getHobbies = createRoutine('GET_HOBBIES');
export const addHobby = createRoutine('ADD_HOBBY');
export const deleteHobby = createRoutine('DELETE_HOBBY');

export default (state, action) => {
    switch (action.type) {
        //Get Hobbies by user id
        case getHobbies.TRIGGER:
            return {
                ...state,
                loading: true,
                error: false,
                successRes: false,
                hobbiesDetail: undefined
            };
        case getHobbies.SUCCESS:
            return {
                ...state,
                loading: false,
                successRes: true,
                hobbiesDetail: {
                    ...action.payload
                },
                error: false
            };
        case getHobbies.FAILURE:
            return {
                ...state,
                loading: false,
                successRes: false,
                error: true
            };
        //add a hobby
        case addHobby.TRIGGER:
            return {...state, loading: true, adding: true, error: false, successRes: false};
        case addHobby.SUCCESS:
            let updatedHobbies = state.hobbiesDetail.hobbies || [];
            updatedHobbies.push(action.payload);
            return {
                ...state,
                adding: false,
                successRes: true,
                error: false,
                loading: false,
                hobbiesDetail: {hobbies: updatedHobbies}
            };
        case addHobby.FAILURE:
            return {
                ...state,
                adding: false,
                successRes: false,
                loading: false,
                error: true
            };
        //Delete a hobby
        case deleteHobby.TRIGGER:
            return {...state, loading: true, error: false, successRes: false};
        case deleteHobby.SUCCESS:
            return {
                ...state,
                loading: false,
                successRes: true,
                error: false
            };
        case deleteHobby.FAILURE:
            return {
                ...state,
                loading: false,
                successRes: true,
                error: true
            };
        default:
            return {...state}
    }
}
