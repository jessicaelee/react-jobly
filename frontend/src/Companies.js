import React, { useState, useEffect, useRef } from 'react';
import JoblyAPI from './JoblyAPI';
import CompanyCard from './CompanyCard'
import Paginator from 'react-hooks-paginator';


function Companies() {
  const pageLimit = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCompanies, setCurrentCompanies] = useState([]);
  const [offset, setOffset] = useState(0);
  const [companies, setCompanies] = useState([]);
  const [form, setForm] = useState({ search: "" });
  const message = useRef("Loading...")

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    message.current = "No companies match your search."
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

  useEffect(() => {
    setCurrentCompanies(companies.slice(offset, offset + pageLimit));
  }, [offset, companies]);

  const getCompanies = async (search) => {
    let resp = await JoblyAPI.getCompanies(search);

    return resp;
  };

  function handleChange(evt) {
    const { name, value } = evt.target;
    setForm(fData => ({
      ...fData, [name]: value
    }));
  };

  const CompanyCards = companies.length > 0
    ? currentCompanies.map(company => <CompanyCard company={company} key={company.handle} />)
    : message.current;

  return (
    <div className="Companies pt-5">
      <div className="col-md-8 offset-md-2">
        <form className="Companies-search form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
          <input className="form-control flex-grow-1 mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="search"
            onChange={handleChange}
            value={form.search}
            name="search" />
          <button className="btn btn-outline-primary my-2 my-sm-0" type="submit" >Search</button>
        </form>

        <div className="Companies-List">
          {CompanyCards}
        </div>
      </div>
      <Paginator
        totalRecords={companies.length}
        pageLimit={pageLimit}
        pageNeighbours={2}
        setOffset={setOffset}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>

  );

};

export default Companies;