import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loadUserAction, updateUserProfileAction } from "../../redux/actions/userAction";
import { toast } from "react-toastify";
// import { updateUserProfileAction } from "../../redux/actions/userAction";

const EditProfileModal = ({ user, onClose,BASE_URL }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [profilePicture, setProfilePicture] = useState(BASE_URL+user.image || "");
    const [selectedImage, setSelectedImage] = useState(null);

    // Handle Image Change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file)); // Preview Image
            setProfilePicture(file); // Store for API Upload
        }
    };

    const handleSave = () => {

        const formData = new FormData();
        formData.append(
            "user",
            JSON.stringify({
                name: name,
                email: email,
                role:email==="admin@gmail.com"?"ROLE_ADMIN":"ROLE_USER"
            })
        );

        if (profilePicture instanceof File) {
            formData.append("image", profilePicture);
        } else {
            console.error("Image is not a valid file:", profilePicture);
            return;
        }

        // ✅ Debug FormData
        for (let pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }

        // Dispatch Redux Action
        dispatch(updateUserProfileAction(formData))
            .unwrap()
            .then(() => {
                dispatch(loadUserAction())
                toast.success("User profile updated successfully!");
                onClose();
            })
            .catch((error) => {
                toast.error(error || "Failed to updated profile.");
            });
        // Close modal after saving
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Profile</h2>

                {/* Profile Picture Preview */}
                <div className="flex justify-center mb-4">
                    <label htmlFor="profileUpload">
                        <img
                            src={selectedImage || profilePicture || "https://i.pravatar.cc/150"}
                            alt="Profile"
                            className="w-24 h-24 rounded-full border-4 border-gray-300 cursor-pointer"
                        />
                    </label>
                    <input
                        type="file"
                        id="profileUpload"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                    />
                </div>

                {/* Name Input */}
                <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                {/* Email Input */}
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {/* Buttons */}
                <div className="flex justify-end space-x-2">
                    <button
                        className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditProfileModal;
