import {call, put, takeLatest} from 'redux-saga/effects';
import {addUser, getUsers} from "../reducers/users.reducer";
import Api from '../services/ApiCaller';

function* getUsersRequest(api, {payload}) {
    try {
        const {res = {}} = yield call(Api.callServer, api, payload);
        yield put(getUsers.success(res))
    } catch (e) {
        yield put(getUsers.failure(e))
    }
}

function* addUserRequest(api, {payload}) {
    try {
        const {res = {}} = yield call(Api.callServer, api, payload);
        yield put(addUser.success(res));
        // yield put(getUsers.trigger())
    } catch (e) {
        yield put(addUser.failure(e))
    }
}

export default (api) => {
    const getUsersApi = (data) => api.get('/users', data);
    const addUserApi = (data) => api.post('/users', data);

    return [
        takeLatest(getUsers.TRIGGER, getUsersRequest, getUsersApi),
        takeLatest(addUser.TRIGGER, addUserRequest, addUserApi)
    ]
}
