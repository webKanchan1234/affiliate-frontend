import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import AdminHeader from "../adminheader/AdminHeader";
import { Helmet } from "react-helmet-async";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Helmet>
        <title>Dashboard | Admin Panel</title>
        <meta name="dashboard" content="Manage admin panel." />
      </Helmet>
      
      {/* Fixed Sidebar */}
      <div 
        className={`fixed h-screen ${isSidebarOpen ? "w-64" : "w-16"} transition-all duration-300 z-20`}
        style={{ top: 0, left: 0 }}
      >
        <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      </div>
      
      {/* Main Content Area */}
      <div 
        className={`flex-1 ${isSidebarOpen ? "ml-64" : "ml-16"} transition-all duration-300`}
        style={{ paddingTop: "64px" }} // Match header height
      >
        {/* Fixed Header */}
        <div 
          className="fixed top-0 right-0 z-10"
          style={{ 
            left: isSidebarOpen ? "16rem" : "4rem", // Match sidebar width
            height: "64px" 
          }}
        >
          <AdminHeader />
        </div>
        
        {/* Scrollable Content */}
        <main className="min-h-screen overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;