import React from 'react';
import {Link} from 'react-router-dom';
const Notfound = () => {
    return (
        <>
        <div className="errorSection">
        <Link to="/" style={{fontSize:'1.5rem'}}>
        <p>Go Back</p>
        </Link>
            <h1>404</h1>
            <div>page not found</div>
        </div>
        </>
    );
};

export default Notfound;