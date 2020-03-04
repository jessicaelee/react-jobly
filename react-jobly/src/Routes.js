import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom'

import Company from './Company';
import Companies from './Companies';
import Jobs from './Jobs';
import Login from './Login';
import ProfileEditForm from './ProfileEditForm';
import Home from './Home';
import Nav from './Nav'
import JoblyAPI from './JoblyAPI'
import jwt_decode from 'jwt-decode'
import JoblyApi from './JoblyAPI';

function Routes() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null)

  //don't need to check if token is valid, just if there is one
  //backend validates token
  useEffect(() => {
    checkToken();
    if (loggedIn) {
      getCurrentUser()
    }
  }, [loggedIn])

  async function login(user) {
    let token = await JoblyAPI.loginUser(user)
    localStorage.setItem("_token", token);
    setLoggedIn(true);
  }

  function logout() {
    localStorage.removeItem("_token");
    setLoggedIn(false);
    setCurrentUser(null);
  }

  async function create(user) {
    let token = await JoblyAPI.createUser(user);
    localStorage.setItem("_token", token);
    setLoggedIn(true);
  }

  function checkToken() {
    let token = localStorage.getItem("_token");
    setLoggedIn(token ? true : false);
  }

  async function getCurrentUser() {
    let token = localStorage.getItem("_token");
    let decoded = jwt_decode(token)
    let user = await JoblyAPI.getUser(decoded.username)
    setCurrentUser(user)
  }

  async function updateUser(user) {
    let updatedUser = await JoblyApi.updateUser(user);
    setCurrentUser(updatedUser);
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
          {loggedIn ? <ProfileEditForm user={currentUser} updateUser={updateUser} /> : <Redirect to="/" />}
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