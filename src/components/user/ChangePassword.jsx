import React, { useState } from "react";
import { changePasswordAction } from "../../redux/actions/userAction";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const ChangePassword = ({ onClose, BASE_URL }) => {
    const dispatch=useDispatch()
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setError("New and confirm password not matching!");
            return;
        }

        const obj = {
            password: newPassword
        }

        dispatch(changePasswordAction(obj))
            // .unwrap()
            .then((res) => {
                console.log(res)
                // dispatch(loadUserAction())
                toast.success("password updated successfully!");
                onClose();
            })
            .catch((error) => {
                toast.error(error || "Failed to updated password.");
            });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-lg font-bold text-gray-800">Change Password</h2>

                {error && <p className="text-red-500 mt-2">{error}</p>}
                {message && <p className="text-green-500 mt-2">{message}</p>}

                <form onSubmit={handleChangePassword} className="mt-4">

                    <input
                        type="password"
                        placeholder="New Password"
                        className="w-full p-2 border rounded mt-2"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirm New Password"
                        className="w-full p-2 border rounded mt-2"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />

                    <div className="flex justify-between mt-4">
                        <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded shadow hover:bg-indigo-600 cursor-pointer">
                            Update Password
                        </button>
                        <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded shadow hover:bg-gray-400 cursor-pointer">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
