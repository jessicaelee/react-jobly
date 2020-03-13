import React from 'react';
import { NavLink } from 'react-router-dom';
import "./CompanyCard.css"

function CompanyCard(company) {
  const { handle, name, logo_url, description } = company.company;
  console.log(company)

  return (

    <NavLink exact to={`companies/${handle}`} className="Company card">
      <div className="CompanyCard-Body card-body">
        <h6 className="card-title d-flex justify-content-between">
          <span className="text-capitalize"> {name}
          </span>
          <img className="CCard" src={logo_url} alt={handle} />
        </h6>
        <p> {description} </p>
      </div>
    </NavLink>
  );
}

export default CompanyCard;