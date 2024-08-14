import React from "react";
import "./AddCourseModal.css";

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
    <div className="modal-overlay">
      <div className="modal-content3">
        <h2>Add to course</h2>
        <hr />
        <input
          type="text"
          placeholder="Search"
          className="search-input search-course"
        />

        <div className="course-list ">
          <div className="row mt-4">
            <div className="col-md-6 cards px-3 ">
              <div className="card-content">
                <h3>Course Name</h3>
                <p>Description</p>
                <button className="icon-button">
                  <i className="fa-solid fa-user-plus"></i>
                </button>
              </div>
            </div>

            <div className="col-md-6 cards px-3 ">
              <div className="card-content">
                <h3>Course Name</h3>
                <p>Description</p>
                <button className="icon-button">
                  <i className="fa-solid fa-user-plus"></i>
                </button>
              </div>
            </div>

            <div className="col-md-6 cards px-3">
              <div className="card-content">
                <h3>Course Name</h3>
                <p>Description</p>
                <button className="icon-button">
                  <i className="fa-solid fa-user-plus"></i>
                </button>
              </div>
            </div>

            <div className="col-md-6 cards px-3">
              <div className="card-content">
                <h3>Course Name</h3>
                <p>Description</p>
                <button className="icon-button">
                  <i className="fa-solid fa-user-plus"></i>
                </button>
              </div>
            </div>

            <div className="col-md-6 cards px-3">
              <div className="card-content">
                <h3>Course Name</h3>
                <p>Description</p>
                <button className="icon-button">
                  <i className="fa-solid fa-user-plus"></i>
                </button>
              </div>
            </div>

            <div className="col-md-6 cards px-3">
              <div className="card-content">
                <h3>Course Name</h3>
                <p>Description</p>
                <button className="icon-button">
                  <i className="fa-solid fa-user-plus"></i>
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
