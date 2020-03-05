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
import UserContext from './userContext';
import MyApps from './MyApps'

function Routes() {
  const [isloggedIn, setLoggedIn] = useState(false);
  const { updateUser } = useContext(UserContext);

  //don't need to check if token is valid, just if there is one
  //backend validates token
  useEffect(() => {
    checkToken();
    if (isloggedIn) {
      getCurrentUser()
    }
  }, [isloggedIn])

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
      <Nav isloggedIn={isloggedIn} logout={logout} />
      <Switch >
        <Route exact path="/companies/:handle">
          {isloggedIn ? <Company /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/companies">
          {isloggedIn ? <Companies /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/jobs">
          {isloggedIn ? <Jobs /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/apps">
          {isloggedIn ? <MyApps /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/profile">
          {isloggedIn ? <ProfileEditForm /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/login">
          {!isloggedIn ? <Login login={login} create={create} /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/">
          <Home isloggedIn={isloggedIn} />
        </Route>
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  )

}

export default Routes;