import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiBox, FiLayers, FiChevronLeft, FiChevronRight, FiChevronDown, FiChevronUp, FiPlus, FiUsers } from "react-icons/fi";
import { MdOutlineMessage } from "react-icons/md";
import { MdPayment } from "react-icons/md";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [openTab, setOpenTab] = useState(null);

  const toggleTab = (tab) => {
    setOpenTab(openTab === tab ? null : tab);
  };

  return (
    <aside className={`bg-gray-900 text-white h-screen p-4 transition-all ${isSidebarOpen ? "w-64" : "w-16"} duration-300 relative`}>
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="absolute -right-4 top-6 bg-gray-700 text-white p-1 rounded-full"
      >
        {isSidebarOpen ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
      </button>

      <nav className="mt-6 space-y-4">
        <Link to={"/admin/dashboard"}>
          <button
            // onClick={() => toggleTab("dashboard")}
            className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-700 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <FiBox size={20} />
              {isSidebarOpen && <span>Dashboard</span>}
            </div>

          </button>

        </Link>
        {/* Products Menu */}
        <div>
          <button
            onClick={() => toggleTab("products")}
            className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-700 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <FiBox size={20} />
              {isSidebarOpen && <span>Products</span>}
            </div>
            {isSidebarOpen && (openTab === "products" ? <FiChevronUp /> : <FiChevronDown />)}
          </button>
          {(openTab === "products" || !isSidebarOpen) && (
            <div className="ml-6 space-y-2">
              <Link to="/admin/products" className="block items-center gap-2 p-2 hover:bg-gray-700 rounded">
                {isSidebarOpen && "Products"}
              </Link>
              <Link to="/admin/categories" className="block items-center gap-2 p-2 hover:bg-gray-700 rounded">
                {isSidebarOpen && "Product Categories"}
              </Link>
              <Link to="/admin/brands" className="block items-center gap-2 p-2 hover:bg-gray-700 rounded">
                {isSidebarOpen && "Product Brands"}
              </Link>
              <Link to="/admin/reviews" className="block items-center gap-2 p-2 hover:bg-gray-700 rounded">
                {isSidebarOpen && "Product Reviews"}
              </Link>
            </div>
          )}
        </div>

        {/* users Menu */}
        <div>
          <button
            onClick={() => toggleTab("users")}
            className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-700 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <FiUsers size={20} />
              {isSidebarOpen && <span>Users</span>}
            </div>
            {isSidebarOpen && (openTab === "users" ? <FiChevronUp /> : <FiChevronDown />)}
          </button>
          {(openTab === "users" || !isSidebarOpen) && (
            <div className="ml-6 space-y-2">
              <Link to="/admin/users" className="block items-center gap-2 p-2 hover:bg-gray-700 rounded">
                {isSidebarOpen && "Users"}
              </Link>
              
            </div>
          )}
        </div>

        {/* payment Menu */}
        <div>
          <button
            onClick={() => toggleTab("payments")}
            className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-700 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <MdPayment size={20} />
              {isSidebarOpen && <span>Payments</span>}
            </div>
            {isSidebarOpen && (openTab === "payments" ? <FiChevronUp /> : <FiChevronDown />)}
          </button>
          {(openTab === "payments" || !isSidebarOpen) && (
            <div className="ml-6 space-y-2">
              <Link to="/admin/payments" className="block items-center gap-2 p-2 hover:bg-gray-700 rounded">
                {isSidebarOpen && "Payments"}
              </Link>
              
            </div>
          )}
        </div>

         {/* Message Menu */}
         <div>
          <button
            onClick={() => toggleTab("messages")}
            className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-700 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <MdOutlineMessage size={20} />
              {isSidebarOpen && <span>Messages</span>}
            </div>
            {isSidebarOpen && (openTab === "messages" ? <FiChevronUp /> : <FiChevronDown />)}
          </button>
          {(openTab === "messages" || !isSidebarOpen) && (
            <div className="ml-6 space-y-2">
              <Link to="/admin/messages" className="block items-center gap-2 p-2 hover:bg-gray-700 rounded">
                {isSidebarOpen && "Messages"}
              </Link>
              
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
