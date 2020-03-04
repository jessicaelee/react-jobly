import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect, BrowserRouter, useHistory } from 'react-router-dom'

import Company from './Company';
import Companies from './Companies';
import Jobs from './Jobs';
import Login from './Login';
import ProfileEditForm from './ProfileEditForm';
import Home from './Home';
import Nav from './Nav'
import JoblyApi from './JoblyAPI'

function Routes() {
  const [loggedIn, setLoggedIn] = useState(false);

  //don't need to check if token is valid, just if there is one
  //backend validates token
  useEffect(() => {
    checkToken();
  }, [])

  async function login(user) {
    let token = await JoblyApi.loginUser(user)
    localStorage.setItem("_token", token);
    setLoggedIn(true);
  }

  function logout() {
    localStorage.removeItem("_token");
    setLoggedIn(false);
  }

  async function create(user) {
    let token = await JoblyApi.createUser(user);
    localStorage.setItem("_token", token);
    setLoggedIn(true);
  }

  function checkToken() {
    let token = localStorage.getItem("_token");
    setLoggedIn(token ? true : false);
  }


  return (
    <BrowserRouter>
      <Nav loggedIn={loggedIn} logout={logout} />
      <Switch >
        <Route exact path="/companies/:handle">
          {loggedIn ? <Company /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/companies">
          {loggedIn ? <Companies /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/jobs">
          {loggedIn ? <Jobs /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/profile">
          {loggedIn ? <ProfileEditForm /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/login">
          {!loggedIn ? <Login login={login} create={create} /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/">
          <Home loggedIn={loggedIn} />
        </Route>
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  )

}

export default Routes;