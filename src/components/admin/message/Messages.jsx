import React, { useEffect, useState } from "react";
import { FiFilter, FiPlus, FiSearch } from "react-icons/fi";
import Table from "../../common/Table";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteBrandAction, getAllBrandsAction, updateBrandAction } from "../../../redux/actions/brandAction";
import { use } from "react";
import Model from "../../common/Model";
import DynamicForm from "../../common/DynamicForm";
import { getAllCategories } from "../../../redux/actions/categoryAction";
import Form from "../../common/Form";
import { toast } from 'react-toastify'
import { Helmet } from "react-helmet-async";
import { allMessageAction, deleteMessageAction } from "../../../redux/actions/contactusAction";

const Messages = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { messages, loading, error } = useSelector((state) => state.allMessages);



  //   console.log(messages)

  useEffect(() => {
    dispatch(allMessageAction());
  }, [dispatch]);


  const messageColumns = [
    { key: "contactusId", label: "ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "message", label: "Message" },
  ];



  const handleEdit = (msg) => {

  };

  const handleDelete = (msg) => {
    dispatch(deleteMessageAction(msg.contactusId))
      .unwrap()
      .then(() => {
        toast.success("Message deleted successfully!");
        dispatch(allMessageAction());
      })
      .catch((error) => {
        toast.error(error || "Failed to deleted category.");
      });
  };

  const handleView = (product) => {
    // console.log("View product details:", product);
    // alert(`Viewing details of ${product.name}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

  };

  return (
    <div>
      <Helmet>
        <title> Messages</title>
        <meta name="all Messages" content="Messages" />
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
              <Link to={"/admin/add-brand"} className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                <FiPlus size={20} />
                <span >Add</span>
              </Link>
            </div>
          </div>
        </div>



      </div>
      <Table title="Manage Messages data" columns={messageColumns} data={messages} onEdit={handleEdit} onDelete={handleDelete} onView={handleView} />

    </div>
  );
};

export default Messages;
