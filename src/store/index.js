import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {connectRouter, routerMiddleware} from 'connected-react-router';
import {createBrowserHistory} from 'history';
import createSagaMiddleware from 'redux-saga';
import rootSaga from "../sagas";
import UsersReducer from "../reducers/users.reducer";
import HobbiesReducer from "../reducers/hobbies.reducer";

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    users: UsersReducer,
    hobbies: HobbiesReducer
});

export const Store = createStore(
    createRootReducer(history),
    composeEnhancers(applyMiddleware(sagaMiddleware, routerMiddleware(history)))
);

sagaMiddleware.run(rootSaga);

export default Store
