import React from "react";
import "./AddCourseModal.css";
import { UserPlus,Search } from 'react-feather';

interface AddCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddCourseModal: React.FC<AddCourseModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleSave = () => {
    console.log("Course saved");
    onClose();
  };

  return (
    <div className="modal-overlay" data-testid="modal-overlay">
      <div className="modal-content3" data-testid="modal-content">
        <h2>Add to course</h2>
        <hr />
        {/* search */}
        <div className="search-container">
           <input
              type="text"
               placeholder="Search"
              className="search-input search-course"
               />
               <div className="search-icon">
               <Search size={20} />
               </div>
               </div>

        <div className="course-list ">
          <div className="row mt-4">
            <div className="col-md-6 cards px-3 ">
              <div className="card-content" data-testid="card-content">
                <h3>Course Name</h3>
                <p>Description</p>
                <button className="icon-button">
                <UserPlus size={24} />             
                   </button>
              </div>
            </div>

            <div className="col-md-6 cards px-3 ">
              <div className="card-content" data-testid="card-content">
                <h3>Course Name</h3>
                <p>Description</p>
                <button className="icon-button">
                <UserPlus size={24} />
                                </button>
              </div>
            </div>

            <div className="col-md-6 cards px-3">
              <div className="card-content" data-testid="card-content">
                <h3>Course Name</h3>
                <p>Description</p>
                <button className="icon-button">
                <UserPlus size={24} />
                </button>
              </div>
            </div>

            <div className="col-md-6 cards px-3">
              <div className="card-content" data-testid="card-content">
                <h3>Course Name</h3>
                <p>Description</p>
                <button className="icon-button">
                  <UserPlus size={24} />
                </button>
              </div>
            </div>

            <div className="col-md-6 cards px-3">
              <div className="card-content" data-testid="card-content">
                <h3>Course Name</h3>
                <p>Description</p>
                <button className="icon-button">
                <UserPlus size={24} />
                </button>
              </div>
            </div>

            <div className="col-md-6 cards px-3">
              <div className="card-content" data-testid="card-content">
                <h3>Course Name</h3>
                <p>Description</p>
                <button className="icon-button">
                <UserPlus size={24}  />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-actions mt-5">
          <div className="row mt-4">
            <div className="col-md-6 text-center mt-5">
              <button onClick={onClose} className="btn btn-secondary">
                Cancel
              </button>
            </div>
            <div className="col-md-6 text-center mt-5">
              <button onClick={handleSave} className="btn btn-primary">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourseModal;
