import React, { useState } from "react";
import "./../UserProfile/UserProfile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrashAlt,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import think from "../../assests/Thinking 1.png";

const PaymentsPage: React.FC = () => {
  const [isOnlinePayments, setIsOnlinePayments] = useState(true);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [paymentToDelete, setPaymentToDelete] = useState<number | null>(null);
  const [paymentToEdit, setPaymentToEdit] = useState<number | null>(null);
  const [editedPayment, setEditedPayment] = useState<any>(null);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  const [offlinePaymentsData, setOfflinePaymentsData] = useState([
    {
      date: "2024-08-01",
      method: "Cash",
      type: "Monthly",
      amount: 500,
      currency: "EGP",
    },
    {
      date: "2024-08-01",
      method: "Cash",
      type: "Extra payment",
      amount: 500,
      currency: "EGP",
    },
  ]);
  const handleDateChange = (field: "start" | "end", value: string) => {
    if (field === "start") {
      setStartDate(value);
    } else {
      setEndDate(value);
    }
  };

  //  data
  const onlinePaymentsData = [
    {
      id: "pi_3Pikhv062D4e6xfi1hfGKVFn",
      date: "8/1/2024 1:10:26 AM",
      method: "Stripe",
      amount: 500,
      currency: "EGP",
    },
    {
      id: "pi_3Pj4In062D4e6xfi0eaYVWit",
      date: "8/1/2024 10:08:38 PM",
      method: "Stripe",
      amount: 500,
      currency: "EGP",
    },
  ];

  const filterData = (data: any[]) => {
    return data.filter((item) => {
      const itemDate = new Date(item.date);
      const start = new Date(startDate);
      const end = new Date(endDate);

      return (!startDate || itemDate >= start) && (!endDate || itemDate <= end);
    });
  };

  const filteredOnlinePayments = filterData(onlinePaymentsData);
  const filteredOfflinePayments = filterData(offlinePaymentsData);

  // Handler functions for delete and edit actions
  const handleEdit = (index: number) => {
    setPaymentToEdit(index);
    setEditedPayment({ ...offlinePaymentsData[index] });
    setShowEditModal(true);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedPayment({ ...editedPayment, [e.target.name]: e.target.value });
  };

  const saveEdit = () => {
    if (paymentToEdit !== null) {
      const updatedOfflinePayments = [...offlinePaymentsData];
      updatedOfflinePayments[paymentToEdit] = editedPayment;
      setOfflinePaymentsData(updatedOfflinePayments);
      setPaymentToEdit(null);
      setEditedPayment(null);
      setShowEditModal(false);
    }
  };

  const cancelEdit = () => {
    setPaymentToEdit(null);
    setEditedPayment(null);
    setShowEditModal(false);
  };

  const handleDelete = (index: number) => {
    setPaymentToDelete(index);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (paymentToDelete !== null) {
      const updatedOfflinePayments = [...offlinePaymentsData];
      updatedOfflinePayments.splice(paymentToDelete, 1);
      setOfflinePaymentsData(updatedOfflinePayments);
      setPaymentToDelete(null);
      setShowDeleteModal(false);
    }
  };

  const cancelDelete = () => {
    setPaymentToDelete(null);
    setShowDeleteModal(false);
  };
  return (
    <div>
      <div className="action-buttons">
        <div className="back-button">
          <button
            className={`toggle-btn ${isOnlinePayments ? "active" : ""}`}
            onClick={() => setIsOnlinePayments(true)}
          >
            Online payments
          </button>
          <button
            className={`toggle-btn but2 ${!isOnlinePayments ? "active" : ""}`}
            onClick={() => setIsOnlinePayments(false)}
          >
            Offline payments
          </button>
        </div>
      </div>

      {/* Date Filter */}
      <button
        className="add-user-btn filter payment-page-filter-button"
        onClick={() => setShowFilter(!showFilter)}
      >
        <FontAwesomeIcon icon={faFilter} /> Filters
      </button>
      {showFilter && (
        <div className="filter-form">
          <h4>Filters</h4>
          <h3>Enrollment Date</h3>
          <div className="row mb-3 mt-3">
            <div className="filter-field  col-md-6">
              <label  htmlFor="start-date"> From :</label>
              <input
              id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => handleDateChange("start", e.target.value)}
                className="form-control"
              />
            </div>
            <div className="filter-field col-md-6 mb-3">
              <label  htmlFor="end-date">To :</label>
              <input
              id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => handleDateChange("end", e.target.value)}
                className="form-control"
              />
            </div>
          </div>
        </div>
      )}

      {isOnlinePayments ? (
        <div>
          <table className="courses-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Payment date</th>
                <th>Payment method</th>
                <th>Payment amount</th>
                <th>Currency</th>
              </tr>
            </thead>
            <tbody>
              {filteredOnlinePayments.length > 0 ? (
                filteredOnlinePayments.map((payment) => (
                  <tr key={payment.id}>
                    <td>{payment.id}</td>
                    <td>{payment.date}</td>
                    <td>{payment.method}</td>
                    <td>{payment.amount}</td>
                    <td>{payment.currency}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5}>No payments available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <table className="courses-table">
            <thead>
              <tr>
                <th>Payment date</th>
                <th>Payment method</th>
                <th>Payment type</th>
                <th>Payment amount</th>
                <th>Currency</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredOfflinePayments.length > 0 ? (
                filteredOfflinePayments.map((payment, index) => (
                  <tr key={index}>
                    <td>{payment.date}</td>
                    <td>{payment.method}</td>
                    <td>{payment.type}</td>
                    <td>{payment.amount}</td>
                    <td>{payment.currency}</td>
                    <td>
                      <button
                        className="action-btn edit"
                        onClick={() => handleEdit(index)}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        className="action-btn delete"
                        onClick={() => handleDelete(index)}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5}>No payments available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      {/* delete payment modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-content2">
            <div className="photo-container mt-5">
              <img src={think} alt="Payment" />
            </div>
            <p className="sure text-center">
              Are you sure you want to delete this payment?
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
      )}
      {/* Edit Payment Modal */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-content2">
            <h4 className="add">Edit Payment</h4>
            <hr />

            <div className="row mb-3 mt-3">
              <div className="col-md-6">
                <label className="form-label">Date</label>
                <input
                  type="date"
                  name="date"
                  value={editedPayment?.date}
                  onChange={handleEditChange}
                  className="form-control"
                />
              </div>
              <div className=" col-md-6">
                <label className="form-label">Method</label>
                <input
                  type="text"
                  name="method"
                  value={editedPayment?.method}
                  onChange={handleEditChange}
                  className="form-control"
                />
              </div>
              <div className=" col-md-6">
                <label className="form-label">Type</label>
                <input
                  type="text"
                  name="type"
                  value={editedPayment?.type}
                  onChange={handleEditChange}
                  className="form-control"
                />
              </div>
              <div className=" col-md-6">
                <label className="form-label">Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={editedPayment?.amount}
                  onChange={handleEditChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Currency</label>
                <input
                  type="text"
                  name="currency"
                  value={editedPayment?.currency}
                  onChange={handleEditChange}
                  className="form-control"
                />
              </div>
            </div>
            <div className="modal-actions">
              <div className="row mb-3 mt-3">
                <div className="col-md-6 text-center">
                  <button className="btn btn-secondary" onClick={cancelEdit}>
                    Cancel
                  </button>
                </div>
                <div className="col-md-6 text-center">
                  <button className="btn btn-primary" onClick={saveEdit}>
                    Save
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

export default PaymentsPage;
