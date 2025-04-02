import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = () => {
    const { isAuthenticated, loading } = useSelector((state) => state.loadUser);
  
    // console.log("PublicRoute Render:", { isAuthenticated, loading });
  
    if (loading) return null; // ✅ Prevent rendering while loading
  
    if (isAuthenticated) return <Navigate to="/admin/dashboard" replace />;
  
    return <Outlet />;
  };
  

export default PublicRoute;
