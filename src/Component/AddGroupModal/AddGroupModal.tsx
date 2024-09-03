import React from "react";
import "./AddGroupModal.css"; 
import { UserPlus ,Search} from 'react-feather';

interface AddGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddGroupModal: React.FC<AddGroupModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleSave = () => {
    console.log("Saving group selection...");
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content3">
        <h2>Add to Group</h2>
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

     
        <table className="groups-table">
          <thead>
            <tr>
              <th>Group Name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="minus">
                  Group One
                  <button className="remove-course-btn plus mx-4">
                  <UserPlus size={24} />  
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td>  <div className="minus">
                  Group two
                  <button className="remove-course-btn plus mx-4">
                  <UserPlus size={24} />  
                  </button>
                </div></td>
            </tr>
            <tr>
              <td>  <div className="minus ">
                  Group three
                  <button className="remove-course-btn plus mx-4">
                  <UserPlus size={24} />  
                  </button>
                </div></td>
            </tr>
          </tbody>
        </table>
        <div className="modal-actions down">
          <div className="row">
            <div className="col-md-6 text-center ">
              <button onClick={onClose} className="btn btn-secondary">
                Cancel
              </button>
            </div>
            <div className="col-md-6 text-center ">
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

export default AddGroupModal;
