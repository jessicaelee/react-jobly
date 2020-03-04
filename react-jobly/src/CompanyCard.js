import React from 'react';
import { Link } from 'react-router-dom'

function CompanyCard(company) {
    const { handle, name, logo_url, description } = company.company

    return (

        <Link exact to={`companies/${handle}`} className="card">
            <div className="CompanyCard-Body card-body">
                <h6 className="card-title d-flex justify-content-between">
                    <span className="text-capitalize"> {name}
                    </span>
                    <img src={logo_url} alt={handle} />
                </h6>
                <p> {description} </p>
            </div>
        </Link>

    )
}

export default CompanyCard;