import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUserAction } from "../../../redux/actions/userAction";

const AdminHeader = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user, loading } = useSelector((state) => state.loadUser);
  const [showDropdown, setShowDropdown] = useState(false);


   const logoutHandle=()=>{
      dispatch(logoutUserAction())
      window.location.reload()
      navigate("/")
    }

  return (
    <header className="bg-gray-800 text-white flex justify-between items-center p-4 shadow-md w-full">
      <Link to={"/"} className="text-lg ml-3 font-semibold">Home</Link>
      <h1 className="text-lg ml-3 font-semibold">Admin Dashboard</h1>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <input type="text" className="p-2 pl-10 rounded-md bg-gray-700 text-white" placeholder="Search..." />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        {isAuthenticated ? (
                  <div 
                    className="relative" 
                    onMouseEnter={() => setShowDropdown(true)} 
                    onMouseLeave={() => setShowDropdown(false)}
                  >
                    <img
                      src={BASE_URL+user?.image || "https://i.pravatar.cc/40?img=5"}
                      alt="Profile"
                      className="w-10 h-10 rounded-full cursor-pointer"
                    />
                    {showDropdown && (
                      <div className="absolute right-0  w-48 bg-white text-black shadow-lg rounded-lg p-2">
                        <p className="px-4 py-2">{user?.name}</p>
                        <Link to="/user/profile" className="block px-4 py-2 hover:bg-gray-200">Profile</Link>
                        {user?.role === "ROLE_ADMIN" && (
                          <Link to="/admin/dashboard" className="block px-4 py-2 hover:bg-gray-200">Dashboard</Link>
                        )}
                        <button 
                          className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                          onClick={logoutHandle}
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link to="/admin/login" className="text-gray-400 hover:text-white cursor-pointer">Login/Signup</Link>
                )}
      </div>
    </header>
  );
};

export default AdminHeader;
