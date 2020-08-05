import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Alert from './Alert'
import './Login.css'

const INITIAL_FORM_STATE = {
  username: "",
  password: "",
  first_name: "",
  last_name: "",
  email: ""
}

function Login({ login, create }) {
  const [returning, setReturning] = useState(true);
  const [form, setForm] = useState(INITIAL_FORM_STATE);
  const [alert, setAlert] = useState(null);

  let history = useHistory();

  function toggleForm(state) {
    setReturning(state);
    setForm(INITIAL_FORM_STATE);
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setForm(fData => ({
      ...fData, [name]: value
    }));
  }

  async function handleLogin(evt) {
    evt.preventDefault();
    try {
      await login(form);
      history.push("/jobs");
    } catch (err) {
      setAlert(<Alert messages={err} />)
      setTimeout(() => setAlert(null), 4000)
    }
  }

  async function handleCreate(evt) {
    evt.preventDefault();
    try {
      await create(form);
      history.push("/jobs");
    } catch (err) {
      setAlert(<Alert messages={err} />)
      setTimeout(() => setAlert(null), 6000)
    }
  }


  const { username, password, firstName, lastName, email } = form;

  const loginForm = (
    <form className="Login-loginForm" onSubmit={handleLogin}>
      <div className="Login form-group">
        <label htmlFor="username">Username</label>
        <br />
        <input id="username"
          className="form-control"
          name="username"
          type="text"
          required
          onChange={handleChange}
          value={username} />
      </div>
      <div className="Login form-group">
        <label htmlFor="password">Password</label>
        <br />
        <input id="password"
          className="form-control"
          name="password"
          type="password"
          required
          onChange={handleChange}
          value={password} />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>

    </form>
  )

  const signUpForm = (
    <form className="Login-signUpForm" onSubmit={handleCreate}>
      <div className="Login form-group">
        <label htmlFor="username">Username</label>
        <input id="username"
          className="form-control"
          name="username"
          type="text"
          required
          onChange={handleChange}
          value={username} />
      </div>
      <div className="Login form-group">
        <label htmlFor="password">Password</label>
        <input id="password"
          className="form-control"
          name="password"
          type="password"
          required
          onChange={handleChange}
          value={password} />
      </div>
      <div className="Login form-group">
        <label htmlFor="firstName">First Name</label>
        <input id="firstName"
          className="form-control"
          name="first_name"
          type="text"
          required
          onChange={handleChange}
          value={firstName} />
      </div>
      <div className="Login form-group">
        <label htmlFor="lastName">Last Name</label>
        <input id="lastName"
          className="form-control"
          name="last_name"
          type="text"
          required
          onChange={handleChange}
          value={lastName} />
      </div>
      <div className="Login form-group">
        <label htmlFor="email">Email</label>
        <input id="email"
          className="form-control"
          name="email"
          type="email"
          required
          onChange={handleChange}
          value={email} />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )

  return (
    <div className="Login-container pt-5">
      <div className="Login-form col-md-6 col-lg-4 offset-md-3 offset-lg-4">
        <div className="Login btn-group btn-group-toggle" data-toggle="buttons">
          <label className={`Login btn btn-primary ${returning ? "active" : ""}`}>
            <input type="radio" name="options" id="options1" autoComplete="off" onChange={() => toggleForm(true)} />Login
          </label>
          <label className={`Login btn btn-primary ${!returning ? "active" : ""}`}>
            <input type="radio" name="options" id="options2" autoComplete="off" onChange={() => toggleForm(false)} />Signup
          </label>
        </div>
        <div className="Login card">
          <div className="card-body">
            {alert ? alert : ""}
            {returning ? loginForm : signUpForm}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;