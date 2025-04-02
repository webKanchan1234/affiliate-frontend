import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import AdminHeader from "../adminheader/AdminHeader";
import { Helmet } from "react-helmet-async";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen">
      <Helmet>
        <title>Dashboard | Admin Panel</title>
        <meta name="dashboard" content="Manage admin panel." />
      </Helmet>
      {/* Sidebar (Collapsible) */}
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      
      {/* Main Content */}
      <div className="flex-1">
        <AdminHeader />
        <main className="p-6">
          <Outlet /> {/* This will render the nested admin routes */}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
