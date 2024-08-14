import React, { useState } from "react";
import "./../UserProfile/UserProfile.css";
import think from "../../assests/Thinking 1.png";
interface Group {
  id: number;
  name: string;
}
const GroupsPage: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([
    { id: 1, name: "Accounting" },
    { id: 2, name: "Marketing" },
    { id: 3, name: "Humman Resources" },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [GroupToDelete, setGroupToDelete] = useState<Group | null>(null);

  const handleRemoveCourse = (group: Group) => {
    setGroupToDelete(group);
    setModalOpen(true);
  };

  const handleDelete = () => {
    if (GroupToDelete) {
      setGroups(groups.filter((group) => group.id !== GroupToDelete.id));
      setGroupToDelete(null);
    }
    setModalOpen(false);
  };

  const handleCloseModal = () => {
    setGroupToDelete(null);
    setModalOpen(false);
  };
  return (
    <div>
      <table className="courses-table textdest">
        <thead>
          <tr>
            <th>Group</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((group) => (
            <tr key={group.id}>
              <td>
                <div className="minus">
                  {group.name}
                  <button
                    className="remove-course-btn"
                    onClick={() => handleRemoveCourse(group)}
                  >
                    <i className="fa-solid fa-user-minus"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modalOpen && GroupToDelete && (
        <div id="deleteModal" className="modal-overlay">
          <div className="modal-content2">
            <div className="photo-container mt-5">
              <img src={think} alt="Payment" />
            </div>
            <p className="sure text-center">
              Are you sure you want to remove this user?
            </p>
            <p className="step text-center">This step cannot be undone.</p>
            <div className="modal-actions ">
              <div className="row mb-3 mt-3">
                <div className="col-md-6 text-center">
                  <button
                    onClick={handleCloseModal}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
                <div className="col-md-6 text-center">
                  <button onClick={handleDelete} className="btn btn-primary">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupsPage;
