import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { loadUserAction, loginUserAction } from "../../redux/actions/userAction";

const AuthPage = ({ type }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { user: token } = useSelector((state) => state.loginUser);
  const { isAuthenticated, user, loading, error } = useSelector((state) => state.loadUser);
  const loginError = useSelector((state) => state.loginUser.error); // Capturing login error separately

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    ...(type === "register" && { name: "", confirmPassword: "" }),
  });

  useEffect(() => {
    if (token) {
      dispatch(loadUserAction());
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (user) {
      if (user.role === "ROLE_ADMIN") {
        navigate("/admin/dashboard");
      } else if (user.role === "ROLE_USER") {
        navigate("/user/profile");
      }
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUserAction(formData));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-6 capitalize">{type}</h2>

        {/* ✅ Display error message properly */}
        {loginError && (
          <p className="text-red-500 text-sm text-center">
            {loginError.message || loginError.error || "Invalid email or password"}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <div className="relative">
              <FiMail className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-10 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Your Email"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <div className="relative">
              <FiLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-10 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Your Password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer"
            disabled={loading}
          >
            {loading ? "Processing..." : "Login"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link to="/reset/forgot-password" className="text-blue-500 text-sm hover:underline">
            Forgot Password?
          </Link>
          <p className="mt-2 text-sm">
            Don't have an account?{" "}
            <Link to="/admin/register" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
