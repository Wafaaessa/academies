import React from 'react';
import { Link } from 'react-router-dom';
import './Breadcrumbs.css'; 

interface BreadcrumbsProps {
    items: { label: string, path?: string }[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
    return (
        <div className="breadcrumbs">
            {items.map((item, index) => (
                <span key={index}>
                    {item.path ? <Link to={item.path}>{item.label}</Link> : item.label}
                    {index < items.length - 1 && <span className="breadcrumb-dot">•</span>}
                </span>
            ))}
        </div>
    );
};

export default Breadcrumbs;
