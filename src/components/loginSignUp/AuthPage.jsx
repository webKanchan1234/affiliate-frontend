import React, { useState, useEffect } from "react";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { loadUserAction, loginUserAction, registerUserAction } from "../../redux/actions/userAction";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user: token, error: loginError } = useSelector((state) => state.loginUser);
  const { error: registerError } = useSelector((state) => state.registerUser || {});
  const { user, loading } = useSelector((state) => state.loadUser);

  const [authType, setAuthType] = useState("login"); // "login" or "register"

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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
      } else {
        navigate("/user/profile");
      }
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (authType === "login") {
      dispatch(loginUserAction({ email: formData.email, password: formData.password }));
    } else {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      else {
        dispatch(registerUserAction(formData))
        toast.success("User Register successfully!");
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        })
        // navigate("/user/profile");
      }

      // console.log("Registering user:", formData);
    }
  };

  const toggleAuthType = () => {
    setAuthType(authType === "login" ? "register" : "login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-6 capitalize">
          {authType === "login" ? "Login" : "Register"}
        </h2>

        {(loginError || registerError) && (
          <p className="text-red-500 text-sm text-center mb-4">
            {loginError?.message || registerError?.message || "Something went wrong"}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          {authType === "register" && (
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <div className="relative">
                <FiUser className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-10 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-300"
                  placeholder="Your Name"
                />
              </div>
            </div>
          )}

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

          {authType === "register" && (
            <div className="mb-4">
              <label className="block text-gray-700">Confirm Password</label>
              <div className="relative">
                <FiLock className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-10 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-300"
                  placeholder="Confirm Password"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer"
            disabled={loading}
          >
            {loading ? "Processing..." : authType === "login" ? "Login" : "Register"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          {authType === "login" ? (
            <>
              <p>
                Don’t have an account?{" "}
                <button onClick={toggleAuthType} className="text-blue-500 hover:underline">
                  Sign up
                </button>
              </p>
              <p className="mt-1">
                <a href="/reset/forgot-password" className="text-blue-500 hover:underline">
                  Forgot password?
                </a>
              </p>
            </>
          ) : (
            <p>
              Already have an account?{" "}
              <button onClick={toggleAuthType} className="text-blue-500 hover:underline">
                Login
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
