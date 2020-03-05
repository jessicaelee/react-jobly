import React, { useState, useEffect, useContext } from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';

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
import UserContext from './userContext';

function Routes() {
  const [loggedIn, setLoggedIn] = useState(false);
  const { updateUser } = useContext(UserContext);

  //don't need to check if token is valid, just if there is one
  //backend validates token
  useEffect(() => {
    checkToken();
    if (loggedIn) {
      getCurrentUser()
    }
  }, [loggedIn])

  function checkToken() {
    let token = localStorage.getItem("_token");
    setLoggedIn(token ? true : false);
  }

  async function getCurrentUser() {
    let token = localStorage.getItem("_token");
    let decoded = jwt_decode(token)
    let currentUser = await JoblyAPI.getUser(decoded.username)
    updateUser(currentUser)
  }

  async function login(currentUser) {
    let token = await JoblyAPI.loginUser(currentUser)
    localStorage.setItem("_token", token);
    setLoggedIn(true);
  }

  function logout() {
    localStorage.removeItem("_token");
    setLoggedIn(false);
    updateUser(null);
  }

  async function create(currentUser) {
    let token = await JoblyAPI.createUser(currentUser);
    localStorage.setItem("_token", token);
    setLoggedIn(true);
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