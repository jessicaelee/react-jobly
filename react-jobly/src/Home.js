import React, { useState } from 'react';
import { Link } from 'react-router-dom'

function Home({ loggedIn }) {

  return (
    <div className="Home">
      <h1>Jobly</h1>
      <p>All the jobs, in one convenient place.</p>
      {loggedIn
      ? <h2>Welcome Back!</h2>
      : <Link className="btn btn-primary" to="/login">Login</Link> }
    </div>
  )
}

export default Home;