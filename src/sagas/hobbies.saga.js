import {call, put, takeLatest} from 'redux-saga/effects';
import Api from '../services/ApiCaller';
import {addHobby, deleteHobby, getHobbies} from "../reducers/hobbies.reducer";

function* getHobbiesRequest(api, {payload}) {
    try {
        const {res = {}} = yield call(Api.callServer, api, payload, true);
        yield put(getHobbies.success(res))
    } catch (e) {
        yield put(getHobbies.failure(e.message))
    }
}

function* addHobbyRequest(api, {payload}) {
    try {
        const {res = {}} = yield call(Api.callServer, api, payload);
        yield put(addHobby.success(res));
        // yield put(getHobbies.trigger())
    } catch (e) {
        yield put(addHobby.failure(e))
    }
}

function* deleteHobbyRequest(api, {payload}) {
    try {
        const {res = {}} = yield call(Api.callServer, api, payload, true);
        yield put(deleteHobby.success(res));
        // yield put(getHobbies.trigger())
    } catch (e) {
        yield put(deleteHobby.failure(e))
    }
}

export default (api) => {
    const getHobbiesApi = (id) => api.get(`/hobbies/${id}`);
    const addHobbyApi = (data) => api.post('/hobbies', data);
    const deleteHobbyApi = (id) => api.delete(`/hobbies/${id}`);

    return [
        takeLatest(getHobbies.TRIGGER, getHobbiesRequest, getHobbiesApi),
        takeLatest(addHobby.TRIGGER, addHobbyRequest, addHobbyApi),
        takeLatest(deleteHobby.TRIGGER, deleteHobbyRequest, deleteHobbyApi)
    ]
}
