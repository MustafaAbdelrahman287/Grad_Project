import React from 'react';
import {Switch, Route } from 'react-router-dom';
import Login from './Login/Login';
import Home from './Home/Home';

const Main=()=>(
    <main>
        <Switch>
            <Route exact path='/' component={Login}/>
            <Route exact path='/home' component={Home}/>

        </Switch>
    </main>

)

export default Main;