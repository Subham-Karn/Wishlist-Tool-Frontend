import React, { useEffect } from 'react';
import AdminDashboard from './components/Dashboard';
import AdminNavigation from './components/Navigation';
import { Navigate, Route, Routes } from 'react-router-dom';
import ManageUsers from './components/ManageUsers';
import ManageBlogs from './components/ManageBlogs';
import BlogEditor from './components/BlogEditor';
import ManageScraberData from './components/ManageScraber';

const AdminRoute = () => {
useEffect(()=>{
  document.title = "DealLens | Admin";
},[])
  return (
<div className="flex">
      
      {/* Sidebar Fixed */}
      <div className="fixed h-screen w-64">
        <AdminNavigation />
      </div>

      {/* Right Side Content, with margin-left same as sidebar width */}
      <div className="flex-1 ml-64 p-4">
        <Routes>
          <Route path="/" element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="blogs" element={<ManageBlogs />} />
          <Route path='/blogs/editor' element={<BlogEditor  />} />
          <Route path='/blogs/editor/:id' element={<BlogEditor  />} />
          <Route path='scraber' element={<ManageScraberData/>} />
        </Routes>
      </div>

    </div>
  );
};

export default AdminRoute;
