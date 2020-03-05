import React, { useState, useEffect } from 'react';
import JoblyAPI from './JoblyAPI';
import JobCard from './JobCard';

function Jobs(props) {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({ search: "" });

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    let filteredJobs = await getJobs(form.search)
    setJobs(filteredJobs);
  };

  useEffect(() => {
    async function getInitialJobs() {
      let jobsList = await getJobs();
      setJobs(jobsList)
    }
    getInitialJobs();
  }, []);


  const getJobs = async (search) => {
    let resp = await JoblyAPI.getJobs(search);
    return resp;
  };

  function handleChange(evt) {
    const { name, value } = evt.target;
    setForm(fData => ({
      ...fData, [name]: value
    }));
  };


  const JobCards = jobs.length > 0
    ? jobs.map(job => <JobCard job={job} key={job.id} />)
    : "No jobs match your search";

  return (
    <div className="Jobs pt-5">
      <div className="col-md-8 offset-md-2">
        <form className="Jobs-search form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
          <input className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="search"
            onChange={handleChange}
            value={form.search}
            name="search" />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit" >Search</button>
        </form>
        <div className="Jobs-List">
          {JobCards}</div>
      </div>
    </div>
  );

};


export default Jobs;

