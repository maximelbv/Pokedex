import React from 'react';
import './ReturnHome.scss'

const ReturnHome = () => {
    return (
        <a className='ReturnHome' href={`${process.env.PUBLIC_URL}/`}>
            <i className="fas fa-arrow-left"></i>
        </a>
    );
}

export default ReturnHome;
