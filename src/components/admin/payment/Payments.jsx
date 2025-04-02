import React, { useEffect, useState } from 'react'
import { FiFilter, FiPlus, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Table from '../../common/Table';
import { useDispatch, useSelector } from 'react-redux';
import { allUsersAction, deleteUserAction, updateUserRoleAction } from '../../../redux/actions/userAction';
import { deleteProductAction } from '../../../redux/actions/productAction';
import { toast } from 'react-toastify';
import { Helmet } from "react-helmet-async";
import { getAllPaymentsAction, updatePaymentStatusAction, updateVerifyStatusAction } from '../../../redux/actions/paymentAction';

const Payments = () => {

  const dispatch = useDispatch();
  const { payments } = useSelector(state => state.allPayments);

  const [statusFilter, setStatusFilter] = useState(""); // For filtering by status
  const [paymentFilter, setPaymentFilter] = useState(""); // For filtering by payment status


  // console.log(payments)
  useEffect(() => {
    dispatch(getAllPaymentsAction());
  }, [dispatch])

  // Filter payments based on selected status and payment status
  const filteredPayments = payments.filter(payment => {
    const statusMatch = statusFilter ? payment.status === statusFilter : true;
    const paymentMatch = paymentFilter ? payment.paymentStatus === paymentFilter : true;
    return statusMatch && paymentMatch;
  });


  const paymentColumns = [
    { key: "id", label: "ID" },
    { key: "orderId", label: "orderId" },
    { key: "userName", label: "Name" },
    { key: "email", label: "Email" },
    { key: "paymentMethod", label: "Method" },
    { key: "upiId", label: "UPI ID" },
    { key: "bankName", label: "Bank" },
    { key: "accountNumber", label: "Account" },
    { key: "ifscCode", label: "IFSC" },
    { key: "verifiedAt", label: "Verified" },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <select
          value={row.status}
          onChange={(e) => handleStatusUpdate(row.orderId, e.target.value)}
          className="border p-1 rounded"
        >
          <option value="PENDING">PENDING</option>
          <option value="VERIFIED">VERIFIED</option>
          <option value="REJECTED">REJECTED</option>
        </select>
      ),
    },
    {
      key: "paymentStatus",
      label: "Payment Status",
      render: (row) => (
        <select
          value={row.paymentStatus}
          onChange={(e) => handleUpdatePaymentStatus(row.orderId, e.target.value)}
          className="border p-1 rounded"
        >
          <option value="PENDING">PENDING</option>
          <option value="DONE">DONE</option>
        </select>
      ),
    },
  ];

  const getRowClass = (row) => {
    if (row.paymentStatus === "DONE") return "bg-green-400";
    if (row.status === "VERIFIED") return "bg-green-200"; // Light Green for verified
    if (row.status === "REJECTED") return "bg-red-100"; // Light Red for rejected
    // Light Blue for payment done
    return ""; // No background for PENDING
  };


  const handleStatusUpdate = (id, status) => {

    console.log("Updating status for payment:", id, status);

    dispatch(updateVerifyStatusAction({ orderId: id, status: status }))
      .unwrap()
      .then(() => {
        toast.success("Verify update successfully!");
        // window.location.reload()
        dispatch(getAllPaymentsAction());
        // navigate('/admin/products');
      })
      .catch((error) => {
        toast.error(error || "Failed to update status.");
      });
    // console.log("Updating role for user:", userId, newRole);
  };

  const handleUpdatePaymentStatus = (id, status) => {

    // console.log("Updating status for payment:", id, status);

    dispatch(updatePaymentStatusAction({ orderId: id, status: status }))
      .unwrap()
      .then(() => {
        toast.success("payment status update successfully!");
        // window.location.reload()
        dispatch(getAllPaymentsAction());
        // navigate('/admin/products');
      })
      .catch((error) => {
        toast.error(error || "Failed to update status.");
      });
    // console.log("Updating role for user:", userId, newRole);
  };

  const handleEdit = (product) => {
    alert(`Editing product: ${product.name}`);
  };

  const handleDelete = (user) => {
    // console.log("Deleting product with id:", id);
    if (user.email === 'admin@gmail.com') {
      toast.error("You can't delete admin user!");
      return;
    }
    dispatch(deleteUserAction(user.id))
      .unwrap()
      .then(() => {
        toast.success("user delete successfully!");
        // window.location.reload()
        dispatch(allUsersAction());
        // navigate('/admin/products');
      })
      .catch((error) => {
        toast.error(error || "Failed to deleted user.");
      });
  };

  const handleView = (product) => {
    console.log("View product details:", product);
    alert(`Viewing details of ${product.name}`);
  };

  return (
    <div>
      <Helmet>
        <title>Manage Users | Admin Panel</title>
        <meta name="description" content="Manage and update user roles in the admin panel." />
      </Helmet>


      <div className="bg-white p-6 mb-2 rounded shadow">
        <div className="flex justify-between items-center ">
          <div className="relative flex items-center">
            {/* Search Icon inside Input */}


          </div>
          <div>
            <div className="flex justify-between items-center ">
              {/* Filter Section */}
              <div className="flex items-center mr-3 text-gray-700">
                <div className="flex gap-4">
                  {/* Status Filter */}
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border p-2 rounded bg-white cursor-pointer"
                  >
                    <option value="">All Statuses</option>
                    <option value="PENDING">Pending</option>
                    <option value="VERIFIED">Verified</option>
                    <option value="REJECTED">Rejected</option>
                  </select>

                  {/* Payment Status Filter */}
                  <select
                    value={paymentFilter}
                    onChange={(e) => setPaymentFilter(e.target.value)}
                    className="border p-2 rounded bg-white cursor-pointer"
                  >
                    <option value="">All Payment Statuses</option>
                    <option value="PENDING">Pending</option>
                    <option value="DONE">Done</option>
                  </select>

                  {/* Filter Icon */}
                  <FiFilter size={24} className="text-gray-700" />
                </div>
                {/* <span className="font-medium"></span> */}
              </div>

            </div>
          </div>
        </div>




      </div>
      <Table title="Manage payments data" columns={paymentColumns} data={[...filteredPayments].reverse()} onEdit={handleEdit} onDelete={handleDelete} onView={handleView} showRoleUpdate={true} rowClass={getRowClass} />
    </div>
  );
}

export default Payments