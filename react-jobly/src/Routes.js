import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import Company from './Company';
import Companies from './Companies';
import Jobs from './Jobs';
import Login from './Login';
import ProfileEditForm from './ProfileEditForm';
import Home from './Home';

function Routes() {
    return (
        <Switch>
            <Route exact path="/companies/:handle"> <Company /> </Route>
            <Route exact path="/companies"> <Companies /> </Route>
            <Route exact path="/jobs"> <Jobs /> </Route>
            <Route exact path="/login"> <Login /> </Route>
            <Route exact path="/profile"> <ProfileEditForm /> </Route>
            <Route exact path="/"> <Home /> </Route>
            <Redirect to="/" />
        </Switch>
    )

}

export default Routes;