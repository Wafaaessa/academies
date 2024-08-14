import React from "react";
import files from "../../assests/files.png";
import "./../UserProfile/UserProfile.css";

const FilesPage: React.FC = () => {
  return (
    <div className="payment-content">
      <div className="photo-container">
        <img src={files} alt="Files" />
      </div>
      <p>There are no files for this user</p>
    </div>
  );
};

export default FilesPage;
