import React, { useState, useEffect, useRef } from 'react';
import JoblyAPI from './JoblyAPI';
import JobCard from './JobCard';
import Paginator from 'react-hooks-paginator';
import './Jobs.css'

function Jobs() {
  const pageLimit = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentJobs, setCurrentJobs] = useState([]);
  const [offset, setOffset] = useState(0);
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({ search: "" });
  const message = useRef("Loading...")

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    message.current = "No jobs found."
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

  useEffect(() => {
    setCurrentJobs(jobs.slice(offset, offset + pageLimit));
  }, [offset, jobs]);


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
    ? currentJobs.map(job => <JobCard job={job} key={job.id} />)
    : message.current;

  return (
    <div className="Jobs pt-5">
      <div className="col-md-8 offset-md-2">
        <form className="Jobs-search form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
          <input className="form-control flex-grow-1 mr-sm-2"
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
        <Paginator
          totalRecords={jobs.length}
          pageLimit={pageLimit}
          pageNeighbours={2}
          setOffset={setOffset}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};


export default Jobs;

