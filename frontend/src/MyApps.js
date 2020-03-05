import React, { useState, useContext } from 'react';
import Alert from './Alert'
import UserContext from './userContext'
import JoblyAPI from './JoblyAPI'
import './ProfileEditForm.css'
import JobCard from './JobCard'

function MyApps() {
    const { user } = useContext(UserContext);
    const { jobs } = user;

    let jobCards = jobs.map(job => <JobCard job={job} key={job.id} />)

    return (
        <div className="Jobs pt-5">
            <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
                <h3>My Applications</h3>
            </div>
            <div className="col-md-8 offset-md-2">
                <div className="Jobs-List">
                    {jobCards}
                </div>
            </div>
        </div>
    );

}

export default MyApps;