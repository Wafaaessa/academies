import React from 'react';
import dash from '../../assests/dashborad.png'; // Adjust the path as needed
import './../UserProfile/UserProfile.css';

const Dashoard: React.FC = () => {
    return (
        <>
        <div className="search-top">
        <input type="text" placeholder="Search" className="search-input" />
    </div>
        <div className="payment-content dash-photo">
            <div className="photo-container ">
                <img src={dash} alt="Files" />
            </div>
            <p>No results found</p>
        </div>
        </>
    );
};

export default Dashoard;
