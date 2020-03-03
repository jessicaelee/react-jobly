import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'
import bootstrap from 'bootstrap'

function Nav() {
    const [loggedIn, setLoggedIn] = useState(true);

    function handleLogout() {
        localStorage.removeItem("_token")
        console.log(localStorage)
    }

    const loggedInLinks = (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item mr-4"><NavLink exact to="/companies">Companies</NavLink></li>
            <li className="nav-item mr-4"><NavLink exact to="/jobs">Jobs</NavLink></li>
            <li className="nav-item mr-4"><NavLink exact to="/profile">Profile</NavLink></li>
            <li className="nav-item mr-4"><NavLink exact to="/" onClick={handleLogout}>Logout</NavLink></li>
        </ul>
    )

    const links = (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item mr-4"><NavLink exact to="/login">Login</NavLink></li>
        </ul>
    )


    return (
        <nav className="Nav navbar navbar-expand-md">
            <NavLink exact to="/" className="navbar-brand">Jobly</NavLink>
            {(loggedIn) ? loggedInLinks : links}
        </nav>
    )

}

export default Nav;