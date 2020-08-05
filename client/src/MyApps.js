import React, { useState, useContext, useEffect } from 'react';
import UserContext from './userContext'
import './ProfileEditForm.css'
import JobCard from './JobCard'
import Paginator from 'react-hooks-paginator';

function MyApps() {
    const pageLimit = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [currentJobs, setCurrentJobs] = useState([]);
    const [offset, setOffset] = useState(0);
    const { user } = useContext(UserContext);
    const { jobs } = user;

    let jobCards = currentJobs.map(job => <JobCard job={job} key={job.id} />)

    useEffect(() => {
        setCurrentJobs(jobs.slice(offset, offset + pageLimit));
    }, [offset, jobs]);

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
            <Paginator
                totalRecords={jobs.length}
                pageLimit={pageLimit}
                pageNeighbours={2}
                setOffset={setOffset}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );

}

export default MyApps;