import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { checkStatusAction, submitProofAction } from "../../redux/actions/paymentAction";

const SubmitProof = () => {
  const dispatch = useDispatch();
  const { payment, paymentStatus } = useSelector(state => state.payment)
  const [formData, setFormData] = useState({
    orderId: "",
    userName: "",
    email: "",
    paymentMethod: "",
    upiId: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
  });

  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [activeSection, setActiveSection] = useState("submit"); // Toggle between 'submit' & 'status'

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (payment && payment.status) {
      if (payment.status === "VERIFIED" && payment.paymentStatus=="DONE") {
        setSubmissionStatus("DONE"); // Only mark as DONE when status is VERIFIED
      } else {
        setSubmissionStatus(payment.status);
      }
    }
  }, [payment]);

  // Check Submission Status
  const checkStatus = async () => {
    if (!formData.orderId) {
      toast.error("Please enter Order ID to check status.");
      return;
    }

    dispatch(checkStatusAction(formData.orderId))
      .unwrap()
      .catch((error) => {
        toast.error(error || "Failed to check status.");
      });
  };

  // Submit Proof of Purchase
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.orderId) {
      toast.error("Please enter Order ID.");
      return;
    }


    if (formData.paymentMethod === "UPI" && !formData.upiId) {
      toast.error("Please enter your UPI ID.");
      return;
    }

    if (formData.paymentMethod === "Bank Transfer" && (!formData.bankName || !formData.accountNumber || !formData.ifscCode)) {
      toast.error("Please fill in all bank details.");
      return;
    }

    // const proofData = new FormData();
    // proofData.append("orderId", formData.orderId);
    // proofData.append("userName", formData.userName);
    // proofData.append("email", formData.email);
    // proofData.append("paymentMethod", formData.paymentMethod);
    // proofData.append("paymentDetails", formData.paymentMethod === "UPI" ? formData.upiId : `${formData.bankName}, ${formData.accountNumber}, ${formData.ifscCode}`);
    const data = {
      orderId: formData.orderId,
      userName: formData.userName,
      email: formData.email,
      paymentMethod: formData.paymentMethod,
      upiId: formData.upiId,
      bankName: formData.bankName,
      accountNumber: formData.accountNumber,
      ifscCode: formData.ifscCode
    }

    // if (formData.paymentMethod === "UPI") {
    //   proofData.append("upiId", formData.upiId);
    // } else if (formData.paymentMethod === "Bank Transfer") {
    //   proofData.append("bankName", formData.bankName);
    //   proofData.append("accountNumber", formData.accountNumber);
    //   proofData.append("ifscCode", formData.ifscCode);
    // }

    // for (let pair of proofData.entries()) {
    //         console.log(pair[0], pair[1]);
    //     }

    // try {
    //    axios.post("http://localhost:8080/api/payment/submit", proofData)
    //   .then((response) => {
    //     console.log(response.data);
    //     toast.success("Proof submitted successfully!");
    //   })
    //   // setFormData({
    //   //   orderId: "",
    //   //   userName: "",
    //   //   email: "",
    //   //   paymentMethod: "",
    //   //   upiId: "",
    //   //   bankName: "",
    //   //   accountNumber: "",
    //   //   ifscCode: "",
    //   // });
    // } catch (error) {
    //   toast.error(error.response?.data?.message || "Submission failed!");
    // }

    console.log(data);
    dispatch(submitProofAction(data))
      .unwrap()
      .then((response) => {
        console.log(response);
        toast.success("Proof submitted successfully!");
        setFormData({
          orderId: "",
          userName: "",
          email: "",
          paymentMethod: "",
          upiId: "",
          bankName: "",
          accountNumber: "",
          ifscCode: "",
        });
      })
      .catch((error) => {
        toast.error(error || "Submission failed!");
      });


  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Affiliate Reward System</h2>

      {/* Toggle Buttons */}
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setActiveSection("submit")}
          className={`flex-1 p-2 rounded-lg cursor-pointer ${activeSection === "submit" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}
        >
          Submit Proof
        </button>
        <button
          onClick={() => setActiveSection("status")}
          className={`flex-1 p-2 rounded-lg cursor-pointer ${activeSection === "status" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}
        >
          Check Status
        </button>
      </div>

      {/* Submit Proof Form */}
      {activeSection === "submit" && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="orderId"
            placeholder="Order ID"
            value={formData.orderId}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg mb-3"
            required
          />
          <input
            type="text"
            name="userName"
            placeholder="Your Name"
            value={formData.userName}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg mb-3"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg mb-3"
            required
          />

          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg mb-3"
            required
          >
            <option value="">Select Payment Method</option>
            <option value="PayPal">PayPal</option>
            <option value="UPI">UPI</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>

          {formData.paymentMethod === "UPI" && (
            <input
              type="text"
              name="upiId"
              placeholder="UPI ID"
              value={formData.upiId}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mb-3"
              required
            />
          )}

          {formData.paymentMethod === "Bank Transfer" && (
            <>
              <input
                type="text"
                name="bankName"
                placeholder="Bank Name"
                value={formData.bankName}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg mb-3"
                required
              />
              <input
                type="text"
                name="accountNumber"
                placeholder="Account Number"
                value={formData.accountNumber}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg mb-3"
                required
              />
              <input
                type="text"
                name="ifscCode"
                placeholder="IFSC Code"
                value={formData.ifscCode}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg mb-3"
                required
              />
            </>
          )}


          <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition cursor-pointer">
            Submit Proof
          </button>
        </form>
      )}

      {/* Check Submission Status */}
      {activeSection === "status" && (
        <div>
          <input
            type="text"
            name="orderId"
            placeholder="Enter Order ID to check status"
            value={formData.orderId}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg mb-2"
          />
          <button onClick={checkStatus} className="w-full bg-gray-600 text-white p-2 rounded-lg hover:bg-gray-700 transition cursor-pointer">
            Check Submission Status
          </button>

          {submissionStatus && (
            <div className={`p-3 rounded-lg text-center text-white font-bold mt-3 
    ${submissionStatus === "DONE" ? "bg-green-500" :
                submissionStatus === "PENDING" ? "bg-yellow-500" :
                  submissionStatus === "REJECTED" ? "bg-red-500" :
                    submissionStatus === "VERIFIED" ? "bg-blue-500" : ""}`}>

              {submissionStatus === "DONE" && "💰 Payment Completed: Reward has been credited!"}
              {submissionStatus === "PENDING" && "⏳ Pending: Your proof is under review."}
              {submissionStatus === "REJECTED" && "❌ Rejected: Please contact support."}
              {submissionStatus === "VERIFIED" && "✅ Approved: Payment will be processed soon!"}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SubmitProof;
