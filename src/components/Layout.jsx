import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      <Navbar />
      <div className="container mx-auto px-6 py-8">
        <Outlet />  {/* This renders the child route (dashboard) */}
      </div>
    </div>
  );
};

export default Layout;