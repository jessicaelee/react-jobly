import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import UserContext from './userContext';
import JoblyAPI from './JoblyAPI';
import "./JobCard.css"
import jwt_decode from 'jwt-decode'

function JobCard(props) {
  const { id, title, salary, equity, state, company_handle } = props.job;
  const { user, updateUser } = useContext(UserContext);
  const [applied, setApplied] = useState(state)


  async function applyToJob() {
    try {
      await JoblyAPI.apply(id, user.username);
      setApplied(true);
      updateCurrentUser();
    } catch (err) {
      console.debug(err);
    }
  }
  async function withdrawApplication() {
    try {
      await JoblyAPI.withdraw(id, user.username);
      setApplied(false);
      updateCurrentUser();
    } catch (err) {
      console.debug(err);
    }
  }
  async function updateCurrentUser() {
    let token = localStorage.getItem("_token");
    let decoded = jwt_decode(token);
    let currentUser = await JoblyAPI.getUser(decoded.username);
    updateUser(currentUser);
  }


  const appliedButton = <button
    className="JobCard-button btn btn-outline-danger btn-sm font-weight-bold text-uppercase float-right"
    onClick={withdrawApplication}
  >
    Withdraw App
    </button>

  const button = <button
    onClick={applyToJob}
    className="JobCard-button btn btn-danger btn-sm font-weight-bold text-uppercase float-right">
    Apply
    </button>

  const links = <Link className="JobCard-company" to={`/companies/${company_handle}`}>@{company_handle}</Link>

  return (

    <div className="Job card">
      <div className="JobCard-Body card-body">
        <div className="JobCard-heading">
          <h5 className="card-title d-flex justify-content-between">
            <span className="text-capitalize"> {title}
            </span>
            {(company_handle) ? links : ""}
          </h5>

        </div>
        <div className="Job-detail"> Salary: {salary.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })} </div>
        <div className="Job-detail"> Equity: {equity} </div>
        {(applied) ? appliedButton : button}

      </div>
    </div>

  );
}

export default JobCard;