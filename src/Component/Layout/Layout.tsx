import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import './Layout.css'; 

interface LayoutProps {
    children: ReactNode; 
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="layout">
            <Sidebar />
            <div className="content">
                {children}
            </div>
            <div className="logout">
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
                <Link to="/logout">Logout</Link>
            </div>
        </div>
    );
};

export default Layout;
