import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

const ProtectedRoute = ({ adminOnly = false }) => {
  const navigate = useNavigate();
  const { isAuthenticated, user, loading } = useSelector((state) => state.loadUser);

  useEffect(() => {
    if (!loading && (!isAuthenticated || !user)) {
      // If not authenticated, redirect to home page
      navigate("/");
    } else if (adminOnly && user.role !== "ROLE_ADMIN") {
      // If adminOnly is true and user is not an admin, redirect to profile page
      navigate("/user/profile");
    }
  }, [isAuthenticated, user, loading, navigate, adminOnly]);

  if (loading) return null; // Prevent render until loading is done

  return <Outlet />;
};

export default ProtectedRoute;