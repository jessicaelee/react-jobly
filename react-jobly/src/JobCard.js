import React, { useContext, useState } from 'react';
import UserContext from './userContext';
import JoblyAPI from './JoblyAPI';
import "./JobCard.css"

function JobCard(props) {
  const { id, title, salary, equity, state } = props.job;
  const { user } = useContext(UserContext);
  const [applied, setApplied] = useState(state)

  async function applyToJob() {
    try {
      await JoblyAPI.apply(id, user.username);
      setApplied(true);
    } catch (err) {
      console.debug(err);
    }
  }
  async function withdrawApplication() {
    try {
      await JoblyAPI.withdraw(id, user.username);
      setApplied(false);
    } catch (err) {
      console.debug(err);
    }
  }

  const appliedButton = <button
    className="btn btn-outline-danger btn-sm font-weight-bold text-uppercase float-right"
    onClick={withdrawApplication}
    >
    Withdraw App
    </button>

  const button = <button
    onClick={applyToJob}
    className="btn btn-danger font-weight-bold text-uppercase float-right">
    Apply
    </button>

  return (

    <div className="Job card">
      <div className="JobCard-Body card-body">
        <h6 className="card-title d-flex justify-content-between">
          <span className="text-capitalize"> {title}
          </span>
        </h6>
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