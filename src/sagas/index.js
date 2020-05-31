import {all} from 'redux-saga/effects';
import API from '../services/Api';
import {BASEURL} from '../constants/urls';
import initUsersSaga from '../sagas/users.saga';
import initHobbiesSaga from '../sagas/hobbies.saga';

const {create} = API;
export const api = create(BASEURL);

export default function* root() {
    yield all([
        ...initUsersSaga(api),
        ...initHobbiesSaga(api),
    ])
}
