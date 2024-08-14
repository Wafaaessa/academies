
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUsers, faBook, faChartBar, faCog } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css'; 
import logo from '../../assests/Academy 1.png'; 

const Sidebar: React.FC = () => {
    const [expanded, setExpanded] = useState(false);

    const handleMenuClick = () => {
        setExpanded(!expanded);
    };

    const navItems = [
        { path: '/dashboard', text: 'Dashboard', icon: faTachometerAlt },
        { path: '/users', text: 'Users', icon: faUsers },
        { path: '/courses', text: 'Courses', icon: faBook },
        { path: '/reports', text: 'Reports', icon: faChartBar },
        { path: '/settings', text: 'Settings', icon: faCog }
    ];

    return (
        <div className={`sidebar ${expanded ? 'expanded' : ''}`}>
            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo" />
            </div> 
            <div className="menu-bar" onClick={handleMenuClick}>
                {expanded ? <button className="Wrapper_menuToggler__Qm7qH" data-testid="sidebar-toggle-btn"><span></span><span></span><span></span></button> : <button className="Wrapper_menuToggler__Qm7qH Wrapper_close__1phTM" data-testid="sidebar-toggle-btn"><span></span><span></span><span></span></button>}
            </div>
            {navItems.map((item, index) => (
                <div className="sidebar-item " key={index}>
                  <NavLink 
                        to={item.path} 
                        className={({ isActive }) => isActive ? 'active' : undefined}
                    >
                        <FontAwesomeIcon icon={item.icon} />
                        {expanded && item.text}
                    </NavLink>
                </div>
            ))}
        </div>
    );
};

export default Sidebar;
