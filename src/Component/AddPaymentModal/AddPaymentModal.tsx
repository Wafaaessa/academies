import React, { useState } from "react";
import "./AddPaymentModal.css";

interface AddPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddPaymentModal: React.FC<AddPaymentModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [paymentDate, setPaymentDate] = useState<string>("");
  const [paidAmount, setPaidAmount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<string>("Cash");
  const [paymentType, setPaymentType] = useState<string>("Monthly payment");
  const [anotherReason, setAnotherReason] = useState<boolean>(false);
  const [reasonText, setReasonText] = useState<string>("");

  const handleSubmit = () => {
    console.log({
      paymentDate,
      paidAmount,
      paymentMethod,
      paymentType,
      reasonText,
    });
    onClose();
  };

  return isOpen ? (
    <div className="modal-overlay">
      <div className="modal-content3">
        <h2>Add a New Payment</h2>
        <hr />
        <form>
          <div className="form-group ">
            <label className="form-label">Payment date</label>
            <input
              type="date"
              className="form-control"
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Paid amount</label>
            <input
              type="number"
              className="form-control"
              value={paidAmount}
              onChange={(e) => setPaidAmount(Number(e.target.value))}
            />
          </div>

          <div className="form-radio">
            <label className="form-label">Payment method</label>
            <div className="row mb-3">
              <div className="col-md-6">
                <input
                  type="radio"
                  id="cash"
                  name="payment-method"
                  value="cash"
                  checked={paymentMethod === "Another Payment"}
                  onChange={() => setPaymentMethod("Another Payment")}
                />
                <label htmlFor="cash" className="cash">
                  Cash
                </label>
              </div>
              <div className="col-md-6">
                <input
                  type="radio"
                  id="another-payment"
                  name="payment-method"
                  value="another-payment"
                  checked={paymentType === "Monthly payment"}
                  onChange={() => setPaymentType("Monthly payment")}
                />
                <label htmlFor="another-payment" className="cash">
                  Another Payment
                </label>
              </div>
            </div>
          </div>

          <div className="form-radio">
            <label className="form-label">Payment type</label>
            <div className="row mb-3">
              <div className="col-md-6">
                <input
                  type="radio"
                  id="monthly-payment"
                  name="reason"
                  value="Monthly payment"
                  checked={!anotherReason}
                  onChange={() => setAnotherReason(false)}
                />
                <label htmlFor="monthly-payment" className="cash">
                  Monthly payment
                </label>
              </div>
              <div className="col-md-6">
                <input
                  type="radio"
                  id="another-reason"
                  name="reason"
                  value="Another reason"
                  checked={anotherReason}
                  onChange={() => setAnotherReason(true)}
                />
                <label htmlFor="another-reason" className="cash">
                  Another reason
                </label>
              </div>
              {anotherReason && (
                <div className="col-md-12 d-flex justify-content-center">
                  <textarea
                    placeholder="Type the reason here"
                    value={reasonText}
                    onChange={(e) => setReasonText(e.target.value)}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="modal-actions down2">
            <div className="row">
              <div className="col-md-6 text-center ">
                <button onClick={onClose} className="btn btn-secondary">
                  Cancel
                </button>
              </div>
              <div className="col-md-6 text-center ">
                <button onClick={handleSubmit} className="btn btn-primary">
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default AddPaymentModal;
