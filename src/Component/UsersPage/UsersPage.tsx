import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrashAlt,
  faFilter,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "./../Breadcrumbs/Breadcrumbs";
import "./UsersPage.css";
import think from "../../assests/Thinking 1.png";
import noUsers from "../../assests/no users.png";

interface User {
  id: number;
  name: string;
  phone: number;
  email: string;
  role: string;
  registration: string;
  lastLogin: string;
  selected: boolean;
}

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "John Doe",
      phone: 1234567890,
      email: "john@example.com",
      role: "Admin",
      registration: "2024-07-07",
      lastLogin: "5 hours ago",
      selected: false,
    },
    {
      id: 2,
      name: "Jane Smith",
      phone: 2345678901,
      email: "jane@example.com",
      role: "User",
      registration: "2024-08-07",
      lastLogin: "5 hours ago",
      selected: false,
    },
    {
      id: 3,
      name: "Alice Johnson",
      phone: 3456789012,
      email: "alice@example.com",
      role: "User",
      registration: "2024-07-07",
      lastLogin: "5 hours ago",
      selected: false,
    },
  ]);

  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [addingUser, setAddingUser] = useState<User | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [selectAll, setSelectAll] = useState(false);
  const [massAction, setMassAction] = useState<string | null>(null);
  const [showRemoveFromGroupModal, setShowRemoveFromGroupModal] =
    useState(false);
  const [showBlockUsersModal, setShowBlockUsersModal] = useState(false);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const navigate = useNavigate();

  const filteredUsers = users.filter((user) => {
    const isRoleMatch =
      selectedRoles.length === 0 || selectedRoles.includes(user.role);
    const registrationDate = new Date(user.registration);
    const isDateMatch =
      (!dateFrom || registrationDate >= new Date(dateFrom)) &&
      (!dateTo || registrationDate <= new Date(dateTo));
    return isRoleMatch && isDateMatch;
  });

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const role = e.target.value;
    setSelectedRoles((prevRoles) =>
      prevRoles.includes(role)
        ? prevRoles.filter((r) => r !== role)
        : [...prevRoles, role]
    );
  };

  const handleCheckboxChange = (id: number) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, selected: !user.selected } : user
    );
    setUsers(updatedUsers);

    // Update selectAll state
    const allSelected = updatedUsers.every((user) => user.selected);

    setSelectAll(allSelected);
  };

  const handleSelectAllChange = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setUsers(users.map((user) => ({ ...user, selected: newSelectAll })));
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    document.getElementById("editModal")!.style.display = "block";
  };
  ////////////////////////delete user function////////////////////////////////

  const handleDelete = (user: User) => {
    setUserToDelete(user);
    document.getElementById("deleteModal")!.style.display = "block";
  };

  const confirmDelete = () => {
    if (userToDelete) {
      setUsers(users.filter((user) => user.id !== userToDelete.id));
      setUserToDelete(null);
      document.getElementById("deleteModal")!.style.display = "none";
    }
  };

  const cancelDelete = () => {
    setUserToDelete(null);
    document.getElementById("deleteModal")!.style.display = "none";
  };

  const confirmDelete2 = () => {
    const updatedUsers = users.filter((user) => !user.selected);
    setUsers(updatedUsers);
    setUserToDelete(null);
    setShowDeleteModal(false);
  };

  const cancelDelete2 = () => {
    setUserToDelete(null);
    setShowDeleteModal(false);
  };

  //////////////////////////////////

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "select-one") {
      if (editingUser) {
        setEditingUser({ ...editingUser, [name]: value });
      }
      if (addingUser) {
        setAddingUser({ ...addingUser, [name]: value });
      }
    } else if (name === "registration") {
      if (editingUser) {
        setEditingUser({ ...editingUser, [name]: value });
      }
      if (addingUser) {
        setAddingUser({ ...addingUser, [name]: value });
      }
    } else {
      if (editingUser) {
        setEditingUser({ ...editingUser, [name]: value });
      }
      if (addingUser) {
        setAddingUser({ ...addingUser, [name]: value });
      }
    }
  };

  ////////////////////////validate function////////////////////////////////

  const validateUser = (user: User) => {
    const errors: string[] = [];
    if (!user.name) errors.push("Name is required.");
    if (!user.phone) errors.push("Phone is required.");
    if (!user.email) errors.push("Email is required.");
    if (!user.role) errors.push("Role is required.");
    return errors;
  };

  ////////////////////////ading and editing function////////////////////////////////

  const handleSave = () => {
    if (editingUser) {
      const errors = validateUser(editingUser);
      if (errors.length > 0) {
        setValidationErrors(errors);
        return;
      }
      setUsers(
        users.map((user) => (user.id === editingUser.id ? editingUser : user))
      );
      setEditingUser(null);
      document.getElementById("editModal")!.style.display = "none";
    }
    if (addingUser) {
      const errors = validateUser(addingUser);
      if (errors.length > 0) {
        setValidationErrors(errors);
        return;
      }
      setUsers([
        ...users,
        {
          ...addingUser,
          id: users.length + 1,
          registration: new Date().toLocaleDateString(),
          lastLogin: "Never",
          selected: false,
        },
      ]);
      setAddingUser(null);
      document.getElementById("addModal")!.style.display = "none";
    }
    setValidationErrors([]);
  };

  const handleCancel = () => {
    setEditingUser(null);
    setAddingUser(null);
    setValidationErrors([]);
    document.getElementById("editModal")!.style.display = "none";
    document.getElementById("addModal")!.style.display = "none";
  };
  ////////////////////////AddUser button function////////////////////////////////

  const handleAddUser = () => {
    setAddingUser({
      id: 0,
      name: "",
      phone: 0,
      email: "",
      role: "",
      registration: "",
      lastLogin: "",
      selected: false,
    });
    document.getElementById("addModal")!.style.display = "block";
  };
  ////////////////////////userClick function////////////////////////////////

  const handleUserClick = (user: User) => {
    if (user) {
      navigate(`/user/${user.id}/courses`, {
        state: { username: user.name, userData: user },
      });
    }
  };

  ////////////////////////mass actions function////////////////////////////////

  const handleMassActionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMassAction(e.target.value);
    const selectedUsers = users.filter((user) => user.selected);

    if (e.target.value === "delete") {
      setShowDeleteModal(true);
    } else if (e.target.value === "block") {
      setShowBlockUsersModal(true);
      console.log("Blocking users:", selectedUsers);
    } else if (e.target.value === "remove") {
      setShowRemoveFromGroupModal(true);
    }

    setMassAction(null);
  };

  ////////////////////////remove function///////////////////////////////////////////
  const confirmRemoveFromGroup = () => {
    alert("Removing users from group");
    console.log("Removing users from group");

    // Hide the modal
    setShowRemoveFromGroupModal(false);
  };
  ////////////////////countSelectedUsers/////////////////
  const countSelectedUsers = users.filter((user) => user.selected).length;
  const handleBlockUsers = () => {
    alert("Blocking users"); // Show alert
    console.log(
      "Blocking users:",
      users.filter((user) => user.selected)
    );
    setShowBlockUsersModal(false);
  };

  return (
    <div className="users-page" data-testid="users-page">
      {/* search */}
      <div className="search-top">
        <input type="text" placeholder="Search" className="search-input" />
      </div>
      <Breadcrumbs
        items={[{ label: "Home", path: "/dashboard" }, { label: "Users" }]}
      />
      <div className="action-bar">
        {/* filter button */}
        <div className="bar">
          <input type="text" placeholder="Search" className="search-input" />
          <button
            className="add-user-btn filter"
            onClick={() => setShowFilter(!showFilter)}
          >
            <FontAwesomeIcon icon={faFilter} /> Filters
          </button>
        </div>
        {/* show filter */}
        {showFilter && (
          <div className="filter-form2">
            <h4>Filters</h4>

            <h3>Filter by Role</h3>
            <div className="role-filter ">
              <div className="check-1 my-2">
                <label>
                  <input
                    type="checkbox"
                    value="Admin"
                    checked={selectedRoles.includes("Admin")}
                    onChange={handleRoleChange}
                  />
                  <span className="custom-checkbox"></span>

                  <span className="label-text">Admin</span>
                </label>
              </div>

              <div className="check1 my-2">
                <label>
                  <input
                    type="checkbox"
                    value="User"
                    checked={selectedRoles.includes("User")}
                    onChange={handleRoleChange}
                  />
                  <span className="custom-checkbox"></span>

                  <span className="label-text">User</span>
                </label>
              </div>
              <div className="check-1 my-2">
                <label>
                  <input
                    type="checkbox"
                    value="Student"
                    checked={selectedRoles.includes("Student")}
                    onChange={handleRoleChange}
                  />
                  <span className="custom-checkbox"></span>

                  <span className="label-text">Student</span>
                </label>
              </div>
            </div>

            <div className="row mb-3 mt-4">
              <h3>Resignation date</h3>
              <div className="filter-field2  col-md-6 mb-3">
                <label> From :</label>
                <input
                  type="date"
                  className="form-control"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                />
              </div>
              <div className="filter-field2 col-md-6 mb-3">
                <label>To :</label>
                <input
                  type="date"
                  className="form-control"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}
        {/* mass actions button */}
        {users.some((user) => user.selected) && (
          <div className="mass-actions">
            <select
              className="form-select mass"
              onChange={handleMassActionChange}
              value={massAction || ""}
            >
              <option value="">Mass Actions</option>
              <option value="remove">Remove from Group</option>
              <option value="block">Block Selected Users</option>
              <option value="delete">Delete Selected Users</option>
            </select>
          </div>
        )}
        {/* add button */}
        <div className="b">
          <button className="add-user-btn userbtn" onClick={handleAddUser}>
            <FontAwesomeIcon icon={faPlus} /> Add User
          </button>
        </div>
      </div>
      {/* table list */}
      {users.length > 0 ? (
        <table className="users-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAllChange}
                />
              </th>
              <th>User</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Role</th>
              <th>Registration</th>
              <th>Last Login</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={user.selected}
                    onChange={() => handleCheckboxChange(user.id)}
                    className="userName"
                  />
                </td>
                <td onClick={() => handleUserClick(user)} className="userName">
                  {user.name}
                </td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.registration}</td>
                <td>{user.lastLogin}</td>
                <td>
                  <button
                    className="action-btn edit"
                    onClick={() => handleEdit(user)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    className="action-btn delete"
                    onClick={() => handleDelete(user)}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={3} style={{ textAlign: "center" }}>
                  No users found for the selected date range.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      ) : (
        /////////no users added///////////
        <div className="payment-content ">
          <div className="photo-container mt-5">
            <img src={noUsers} alt="noUsers" />
          </div>
          <p>No users added yet</p>
        </div>
      )}
      {/* Edit User Modal */}
      <div id="editModal" className="modal">
        <div className="modal-content">
          <h3 className="add">Edit User</h3>
          <hr />
          <form>
            {validationErrors.length > 0 && (
              <div className="alert alert-danger">
                {validationErrors.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={editingUser?.name || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Role</label>
                <select
                  name="role"
                  className="form-select"
                  value={editingUser?.role || ""}
                  onChange={handleInputChange}
                >
                  <option value="">Select Role</option>
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                  <option value="Student">Student</option>
                </select>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input
                  type="text"
                  name="email"
                  className="form-control"
                  value={editingUser?.email || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Phone</label>
                <input
                  type="number"
                  name="phone"
                  className="form-control"
                  value={editingUser?.phone || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className=" row mb-3 ">
              <div className="col-md-6">
                <label className="form-label ">Deactivation Date</label>
                <input
                  type="date"
                  name="registration"
                  className="form-control da"
                  value={editingUser?.registration || ""}
                  onChange={handleInputChange}
                  placeholder="DD/MM/YY"
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <button
                  type="button"
                  className="btn btn-secondary ms-5 "
                  data-bs-dismiss="modal"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
              <div className="col-md-6">
                <button
                  type="button"
                  className="btn btn-primary ms-5"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Add User Modal */}
      <div id="addModal" className="modal">
        <div className="modal-content ">
          <h3 className="add">Add new User</h3>
          <hr />
          <form>
            {validationErrors.length > 0 && (
              <div className="alert alert-danger">
                {validationErrors.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={addingUser?.name || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Role</label>
                <select
                  name="role"
                  className="form-select"
                  value={addingUser?.role || ""}
                  onChange={handleInputChange}
                >
                  <option value="">Select Role</option>
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                  <option value="Student">Student</option>
                </select>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input
                  type="text"
                  name="email"
                  className="form-control"
                  value={addingUser?.email || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Phone</label>
                <input
                  type="number"
                  name="phone"
                  className="form-control"
                  value={addingUser?.phone || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className=" row mb-3 ">
              <div className="col-md-6">
                <label className="form-label ">Deactivation Date</label>
                <input
                  type="date"
                  name="registration"
                  className="form-control da"
                  value={addingUser?.registration || ""}
                  onChange={handleInputChange}
                  placeholder="DD/MM/YY"
                />
              </div>
            </div>
            <div className="row mb-3 mt-5">
              <div className="col-md-6 ">
                <button
                  type="button"
                  className="btn btn-secondary ms-5 "
                  data-bs-dismiss="modal"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
              <div className="col-md-6">
                <button
                  type="button"
                  className="btn btn-primary ms-5"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* Remove from Group Modal */}
      <div
        id="removeFromGroupModal"
        className={`modal ${showRemoveFromGroupModal ? "show" : ""}`}
      >
        <div className="modal-content2 ps-4">
          <h3 className="add">Remove from Group</h3>
          <hr />
          <form>
            <div className="row mb-3 ">
              <div className="col-md-6">
                <label className="form-label">Group</label>
                <select className="form-select" name="group">
                  <option value="">Select Group</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Economics">Economics</option>
                  <option value="Chemistry">Chemistry</option>
                </select>
              </div>
            </div>
            <p>{countSelectedUsers} users will be affected by this action</p>
            <div className="row mb-3 b2">
              <div className="col-md-6 text-center">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowRemoveFromGroupModal(false)}
                >
                  Cancel
                </button>
              </div>
              <div className="col-md-6 text-center">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={confirmRemoveFromGroup}
                >
                  Remove
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* Block Users Modal */}
      <div
        id="blockUsersModal"
        className={`modal ${showBlockUsersModal ? "show" : ""}`}
      >
        <div className="modal-content2">
          <div className="photo-container mt-5">
            <img src={think} alt="Payment" />
          </div>

          <p className="sure text-center">
            Are you sure you want to block these users?
          </p>
          <p className="step text-center">This step cannot be undone.</p>
          <div className="modal-actions ">
            <div className="row mb-3 mt-3">
              <div className="col-md-6 text-center">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowBlockUsersModal(false)}
                >
                  Cancel
                </button>
              </div>
              <div className="col-md-6 text-center">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleBlockUsers}
                >
                  Block
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Delete Confirmation Modal */}
      <div id="deleteModal" className="modal">
        <div className="modal-content2">
          <div className="photo-container mt-5">
            <img src={think} alt="Payment" />
          </div>
          <p className="sure text-center">
            Are you sure you want to delete this user?
          </p>
          <p className="step text-center">This step cannot be undone.</p>
          <div className="modal-actions ">
            <div className="row mb-3 mt-3">
              <div className="col-md-6 text-center">
                <button className="btn btn-secondary" onClick={cancelDelete}>
                  Cancel
                </button>
              </div>
              <div className="col-md-6 text-center">
                <button className="btn btn-primary" onClick={confirmDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Delete selected user Confirmation Modal */}
      <div
        id="deleteModal2"
        className={`modal ${showDeleteModal ? "show" : ""}`}
      >
        <div className="modal-content2">
          <div className="photo-container mt-5">
            <img src={think} alt="Payment" />
          </div>
          <p className="sure text-center">
            Are you sure you want to delete these users?
          </p>
          <p className="step text-center">This step cannot be undone.</p>
          <div className="modal-actions ">
            <div className="row mb-3 mt-3">
              <div className="col-md-6 text-center">
                <button className="btn btn-secondary" onClick={cancelDelete2}>
                  Cancel
                </button>
              </div>
              <div className="col-md-6 text-center">
                <button className="btn btn-primary" onClick={confirmDelete2}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
