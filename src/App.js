import React, {Component} from 'react';
import Layout from "./components/Layout"
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

class AppRoutes extends Component {

    render() {
        return <Router>
            <div>
                <Switch>
                    <Route exact path="/" component={Layout}/>
                    {/*<Route exact path="/users" component={Users}/>*/}
                    {/*<Route exact path="/hobbies/:id" component={Hobbies}/>*/}
                </Switch>
            </div>
        </Router>
    }
}

export default AppRoutes
