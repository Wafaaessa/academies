
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
        { path: '/dashboard', text: 'Dashboard', icon: faTachometerAlt, testId: 'dashboard-link' },
        { path: '/users', text: 'Users', icon: faUsers, testId: 'users-link' },
        { path: '/courses', text: 'Courses', icon: faBook, testId: 'courses-link' },
        { path: '/reports', text: 'Reports', icon: faChartBar, testId: 'reports-link' },
        { path: '/settings', text: 'Settings', icon: faCog, testId: 'settings-link' }
    ];

    return (
        <div data-testid="sidebar" className={`sidebar ${expanded ? 'expanded' : ''}`}>
            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo" />
            </div> 
            <div className="menu-bar" onClick={handleMenuClick}>
                {expanded ? <button className="Wrapper_menuToggler__Qm7qH" data-testid="sidebar-toggle-btn"><span></span><span></span><span></span></button> : <button className="Wrapper_menuToggler__Qm7qH Wrapper_close__1phTM" data-testid="sidebar-toggle-btn"><span></span><span></span><span></span></button>}
            </div>
            {navItems.map((item, index) => (
                <div className="sidebar-item " key={index}>
                  <NavLink
                    data-testid={item.testId} 
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
