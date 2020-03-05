import React, { useContext, useState } from 'react';
import UserContext from './userContext';
import JoblyAPI from './JoblyAPI';

function JobCard(props) {
  const { id, title, salary, equity, state } = props.job;
  const { user } = useContext(UserContext);
  const [applied, setApplied] = useState(false)

  async function applyToJob() {
    try {
      await JoblyAPI.apply(id, user.username);
      setApplied(true);
    } catch (err) {
      console.debug(err);
    }
  }

  const appliedButton = <button
    className="btn btn-danger font-weight-bold text-uppercase float-right"
    disabled>
    Applied
    </button>

  const button = <button
    onClick={applyToJob}
    className="btn btn-danger font-weight-bold text-uppercase float-right">
    Apply
    </button>

  return (

    <div className="card">
      <div className="JobCard-Body card-body">
        <h6 className="card-title d-flex justify-content-between">
          <span className="text-capitalize"> {title}
          </span>
        </h6>
        <div> Salary: {salary} </div>
        <div> Equity: {equity} </div>
        {(state === "applied" || applied) ? appliedButton : button}

      </div>
    </div>

  );
}

export default JobCard;