import React from 'react';
import {Switch, Route } from 'react-router-dom';
import Login from './Login';
import Home from './Home';

const main=()=>(
    <main>
        <Switch>
            <Route exact path='/' component={Login}/>
            <Route exact path='/home' component={Home}/>

        </Switch>
    </main>

)

export default Main;