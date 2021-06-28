import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Login from './components/Login';
import Logged from './components/Logged';

import './css/app.css';

    let loggedIn;

    if (localStorage.authToken) {
        loggedIn = true;
    }   else {
        loggedIn = false;
    }

function App() {    

    return (
        <>
            <Switch>
                <Route exact path="/">
                    {loggedIn ? <Redirect to="/user" /> : <Redirect to="/login" />}
                </Route>
                <Route path='/login' component={Login} />
                <Route path='/user' component={Logged} />
            </Switch>
        </>
    );
}

export default App;