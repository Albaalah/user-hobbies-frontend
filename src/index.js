import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import AppRoutes from './App';
import { Store } from './store';

function App() {
    return <Provider store={Store}>
            <Router>
                <div>
                    <Switch>
                        <Route path="/" component={AppRoutes}/>
                    </Switch>
                </div>
            </Router>
        </Provider>
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Router><App/></Router>, rootElement);
