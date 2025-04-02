import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditProfileModal from "./EditProfileModal";
import { loadUserAction } from "../../redux/actions/userAction";
import ChangePassword from "./ChangePassword";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.loadUser);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const BASE_URL = import.meta.env.VITE_BASE_URL;;

  if (!user) {
    return <div className="text-center text-gray-700 text-lg">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-20">
      {/* Profile Banner */}
      <div className="relative bg-gradient-to-r from-purple-500 to-indigo-500 h-32 rounded-t-lg">
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
          <img 
            src={BASE_URL + user.image || "https://i.pravatar.cc/150"} 
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
          />
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-white shadow-lg rounded-b-lg px-6 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
        <p className="text-gray-600">{user.email}</p>

        {/* Edit Profile Button */}
        <button
          onClick={() => setEditModalOpen(true)}
          className="bg-indigo-500 text-white px-4 py-2 mt-4 rounded-lg shadow-md hover:bg-indigo-600 transition cursor-pointer"
        >
          Edit Profile
        </button>

        {/* Change Password Button */}
        <button
          onClick={() => setPasswordModalOpen(true)}
          className="bg-red-500 text-white px-4 py-2 mt-4 ml-4 rounded-lg shadow-md hover:bg-red-600 transition cursor-pointer"
        >
          Change Password
        </button>
      </div>

      {/* Modals */}
      {isEditModalOpen && <EditProfileModal user={user} onClose={() => setEditModalOpen(false)} BASE_URL={BASE_URL} />}
      {isPasswordModalOpen && <ChangePassword onClose={() => setPasswordModalOpen(false)} BASE_URL={BASE_URL} />}
    </div>
  );
};

export default Profile;
