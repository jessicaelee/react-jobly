import React, { useState } from 'react';

function Login({ login, create }) {
  const [returning, setReturning] = useState(true);
  const [form, setForm] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: ""
  })

  function toggleForm(state) {
    setReturning(state);
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setForm(fData => ({
      ...fData, [name]: value
    }));
  }

  function handleLogin(evt) {
    evt.preventDefault();
    login();
  }

  function handleCreate(evt) {
    evt.preventDefault();
    create(form);
  }

  const { username, password, firstName, lastName, email } = form;

  const loginForm = (
    <form className="Login-loginForm" onSubmit={handleLogin}>
      <label htmlFor="username">Username</label>
      <input id="username"
        name="username"
        type="text"
        required
        onChange={handleChange}
        value={username} />
      <label htmlFor="password">Password</label>
      <input id="password"
        name="password"
        type="password"
        required
        onChange={handleChange}
        value={password} />
      <button type="submit" className="btn btn-primary">Submit</button>

    </form>
  )

  const signUpForm = (
    <form className="Login-signUpForm" onSubmit={handleCreate}>
      <label htmlFor="username">Username</label>
      <input id="username"
        name="username"
        type="text"
        required
        onChange={handleChange}
        value={username} />

      <label htmlFor="password">Password</label>
      <input id="password"
        name="password"
        type="password"
        required
        onChange={handleChange}
        value={password} />

      <label htmlFor="firstName">First Name</label>
      <input id="firstName"
        name="firstName"
        type="firstName"
        required
        onChange={handleChange}
        value={firstName} />

      <label htmlFor="lastName">Last Name</label>
      <input id="lastName"
        name="lastName"
        type="lastName"
        required
        onChange={handleChange}
        value={lastName} />

      <label htmlFor="email">Email</label>
      <input id="email"
        name="email"
        type="email"
        required
        onChange={handleChange}
        value={email} />
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )

  return (
    <div className="Login">
      <div className="btn-group">
        <button className="btn btn-primary" onClick={() => toggleForm(true)}>Login</button>
        <button className="btn btn-primary" onClick={() => toggleForm(false)}>Signup</button>
      </div>
      {returning ? loginForm : signUpForm}
    </div>
  )
}

export default Login;