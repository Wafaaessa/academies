import React from 'react';
import dash from '../../assests/dashborad.png'; 
import './../UserProfile/UserProfile.css';
import { Search } from 'react-feather';

const Dashoard: React.FC = () => {
    return (
        <>
       {/* search */}
       <div className="search-container">

<div className="search-top">
  <input type="text" placeholder="Search" className="search-input" />
  <div className="search-icon">
    <Search size={20} />
  </div>
  </div>
</div>
        <div className="payment-content dash-photo" data-testid="dash-page">
            <div className="photo-container ">
                <img src={dash} alt="Files" />
            </div>
            <p>No results found</p>
        </div>
        </>
    );
}; 

export default Dashoard;
