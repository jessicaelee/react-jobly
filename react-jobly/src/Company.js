import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import JoblyAPI from './JoblyAPI';
import JobCard from './JobCard';

function Company() {
  const [company, setCompany] = useState(null)
  const { handle } = useParams();

  useEffect(() => {
    async function getCompany(code) {
      let companyRes = await JoblyAPI.getCompany(code);
      setCompany(companyRes);
    }
    getCompany(handle);
  }, [handle])


  const jobs = company
    ? company.jobs.map(job => <JobCard job={job} key={job.id} />)
    : "No jobs posted";

  return (
    <div className="Company">
      {company
        ? <div><h5 className="text-capitalize">{company.name}</h5>
          <p>{company.description}</p></div>
        : "loading..."}
      <div className="Company-jobs-list">
        {jobs}
      </div>
    </div>
  )
}

export default Company;