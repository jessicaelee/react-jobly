import React from 'react';
import { Link } from 'react-router-dom'
import './Home.css'

function Home({ isloggedIn }) {

  return (
    <div className="Home">
      <h1>Jobly</h1>
      <p>All the jobs, in one convenient place.</p>
      {isloggedIn
        ? <h2>Welcome Back!</h2>
        : <Link className="btn btn-primary" to="/login">Login</Link>}
    </div>
  )
}

export default Home;