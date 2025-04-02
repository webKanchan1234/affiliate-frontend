import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const UserRoute = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.loadUser);

  if (loading) return null; // Prevent render until loading is done

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default UserRoute;