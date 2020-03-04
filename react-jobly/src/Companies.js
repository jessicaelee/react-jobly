import React, { useState, useEffect } from 'react';
import JoblyAPi from './JoblyAPI';
import Axios from 'axios';
import CompanyCard from './CompanyCard'

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [form, setForm] = useState({ search: "" });


  const handleSubmit = async (evt) => {
    evt.preventDefault();
    let filteredCompanies = await getCompanies(form.search)
    setCompanies(filteredCompanies);
  };

  useEffect(() => {
    async function getInitialCompanies() {
      let comps = await getCompanies();

      setCompanies(comps)
    }
    getInitialCompanies();
  }, []);


  const getCompanies = async (search) => {
    let resp = await JoblyAPi.getCompanies(search);

    return resp;
  };

  function handleChange(evt) {
    const { name, value } = evt.target;
    setForm(fData => ({
      ...fData, [name]: value
    }));
  };

  const CompanyCards = companies.length > 0 ? companies.map(company => <CompanyCard company={company} key={company.handle} />) : ""

  return (
    <div className="Companies pt-5">
      <div className="col-md-8 offset-md-2">
        <form className="Companies-search form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="search" onChange={handleChange} value={form.search} name="search" />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit" >Search</button>
        </form>

        <div className="Companies-List">
          {(companies.length > 0) ? CompanyCards : "No companies match your search."}</div>
      </div>
    </div>
  );

};

export default Companies;