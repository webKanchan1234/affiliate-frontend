import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  FiBox, 
  FiLayers, 
  FiChevronLeft, 
  FiChevronRight, 
  FiChevronDown, 
  FiChevronUp, 
  FiPlus, 
  FiUsers,
  FiGrid,
  FiTag,
  FiAward,
  FiStar,
  FiCreditCard,
  FiMessageSquare
} from "react-icons/fi";
import { MdOutlineMessage, MdPayment } from "react-icons/md";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [openTab, setOpenTab] = useState(null);

  const toggleTab = (tab) => {
    setOpenTab(openTab === tab ? null : tab);
  };

  return (
    <aside className={`bg-gray-900 text-white h-full p-4 ${isSidebarOpen ? "w-64" : "w-16"} relative transition-all duration-300`}>
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="absolute -right-4 top-6 bg-gray-700 text-white p-1 rounded-full cursor-pointer z-10"
      >
        {isSidebarOpen ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
      </button>

      <nav className="mt-6 space-y-4">
        <Link to={"/admin/dashboard"}>
          <button className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-700 cursor-pointer">
            <div className="flex items-center gap-2">
              <FiGrid size={20} />
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
            <div className={`${isSidebarOpen ? "ml-6" : "ml-0"} space-y-2 mt-2`}>
              <Link to="/admin/products" className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded">
                <FiLayers size={18} />
                {isSidebarOpen && "Products"}
              </Link>
              <Link to="/admin/categories" className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded">
                <FiTag size={18} />
                {isSidebarOpen && "Categories"}
              </Link>
              <Link to="/admin/brands" className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded">
                <FiAward size={18} />
                {isSidebarOpen && "Brands"}
              </Link>
              <Link to="/admin/reviews" className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded">
                <FiStar size={18} />
                {isSidebarOpen && "Reviews"}
              </Link>
            </div>
          )}
        </div>

        {/* Users Menu */}
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
            <div className={`${isSidebarOpen ? "ml-6" : "ml-0"} space-y-2 mt-2`}>
              <Link to="/admin/users" className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded">
                <FiUsers size={18} />
                {isSidebarOpen && "Users"}
              </Link>
            </div>
          )}
        </div>

        {/* Payments Menu */}
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
            <div className={`${isSidebarOpen ? "ml-6" : "ml-0"} space-y-2 mt-2`}>
              <Link to="/admin/payments" className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded">
                <FiCreditCard size={18} />
                {isSidebarOpen && "Payments"}
              </Link>
            </div>
          )}
        </div>

        {/* Messages Menu */}
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
            <div className={`${isSidebarOpen ? "ml-6" : "ml-0"} space-y-2 mt-2`}>
              <Link to="/admin/messages" className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded">
                <FiMessageSquare size={18} />
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