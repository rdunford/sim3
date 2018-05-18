import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/Profile/Profile';
import Search from './components/Search/Search';

export default (
    <Switch>
        <Route component={Login} exact path='/'/>
        <Route component={Dashboard}  path='/dashboard'/>
        <Route component={Profile}  path='/profile'/>
        <Route component={Search}  path='/search'/>
    </Switch>
)