import React from "react";
import "./../UserProfile/UserProfile.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

interface InfoPageProps {
  userData: any;
}

const InfoPage: React.FC<InfoPageProps> = ({ userData }) => {
  return (
    <div>
      <table className="courses-table textdest">
        <thead>
          <tr>
          <th><i className="fas fa-phone-alt"></i> Phone</th>
          <th><i className="fas fa-envelope "></i> Email</th>
          <th><i className="fas fa-briefcase"></i> Role</th>
          <th><i className="fas fa-calendar-alt"></i> Registration Date</th>
          <th><i className="fas fa-sign-in-alt"></i> Last Login</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td> {userData.phone}</td>
            <td> {userData.email}</td>
            <td> {userData.role}</td>
            <td> {userData.registration}</td>
            <td> {userData.lastLogin}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default InfoPage;
