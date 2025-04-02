import React, { useEffect } from 'react'
import { FiFilter, FiPlus, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Table from '../../common/Table';
import { useDispatch, useSelector } from 'react-redux';
import { allUsersAction, deleteUserAction, updateUserRoleAction } from '../../../redux/actions/userAction';
import { deleteProductAction } from '../../../redux/actions/productAction';
import { toast } from 'react-toastify';
import { Helmet } from "react-helmet-async";

const Users = () => {

  const dispatch = useDispatch();
  const { users, loading, error } = useSelector(state => state.allUsers);

  // console.log(users)
  useEffect(() => {
    dispatch(allUsersAction());
  }, [dispatch])


  const userColumns = [
    { key: "id", label: "userId" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "createdAt", label: "Created At" },
    { key: "image", label: "Profile" },
    {
      key: "updateRole",
      label: "Update Role",
      render: (row) => (
        <select
          value={row.role}
          onChange={(e) => handleRoleUpdate(row.id, e.target.value)}
          className="border p-1 rounded"
        >
          <option value="ROLE_USER">ROLE_USER</option>
          <option value="ROLE_ADMIN">ROLE_ADMIN</option>
        </select>
      ),
    },
  ];
  // const userData = [
  //   {
  //     name: "John Doe",
  //     email: "john@example.com",
  //     role: "ROLE_USER",
  //     createdAt: "2024-02-19",
  //     image: "https://via.placeholder.com/50"
  //   },
  //   {
  //     name: "Jane Smith",
  //     email: "jane@example.com",
  //     role: "ROLE_ADMIN",
  //     createdAt: "2024-01-15",
  //     image: "https://via.placeholder.com/50"
  //   },
  //   {
  //     name: "Alice Johnson",
  //     email: "alice@example.com",
  //     role: "ROLE_USER",
  //     createdAt: "2023-12-10",
  //     image: "https://via.placeholder.com/50"
  //   }
  // ];
  // Handle edit and delete
  

  // Handle role update
  const handleRoleUpdate = (userId, newRole) => {
    
    dispatch(updateUserRoleAction({ id: userId, data: { role: newRole } }))
    .unwrap()
      .then(() => {
        toast.success("role update successfully!");
        // window.location.reload()
        dispatch(allUsersAction());
        // navigate('/admin/products');
      })
      .catch((error) => {
        toast.error(error || "Failed to update role.");
      });
    // console.log("Updating role for user:", userId, newRole);
  };

  const handleEdit = (product) => {
    alert(`Editing product: ${product.name}`);
  };

  const handleDelete = (user) => {
    // console.log("Deleting product with id:", id);
    if(user.email === 'admin@gmail.com'){
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
            {/* Input Field */}
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border rounded-lg w-full outline-none"
            />

            {/* Search Icon inside Input */}
            <FiSearch className="absolute left-3 text-gray-500" size={20} />
          </div>
          <div>
            <div className="flex justify-between items-center ">
              {/* Filter Section */}
              <div className="flex items-center mr-3 cursor-pointer text-gray-700">
                <FiFilter size={20} />
                {/* <span className="font-medium"></span> */}
              </div>

              {/* Add Button */}
              <Link className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                <FiPlus size={20} />
                <span >Add</span>
              </Link>
            </div>
          </div>
        </div>



      </div>
      <Table title="Manage Users data" columns={userColumns} data={users} onEdit={handleEdit} onDelete={handleDelete} onView={handleView} showRoleUpdate={true} />
    </div>
  );
}

export default Users