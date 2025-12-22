import React from 'react';
import { getUser, logout } from '../utils/auth';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const user = getUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;  // Don't show navbar on login/register

  return (
    <nav className="bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700/50 shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/30 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <span className="text-2xl font-black bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              LaundryMart
            </span>
          </Link>

          {/* User Info & Actions */}
          <div className="flex items-center gap-6">
            {/* Welcome Message */}
            <div className="hidden md:block">
              <p className="text-sm text-slate-400">Welcome back,</p>
              <p className="text-white font-bold">
                {user.fullName || user.username}
              </p>
            </div>

            {/* Role Badge */}
            <div className="hidden sm:block">
              <span className={`px-4 py-1.5 rounded-full text-xs font-bold border ${
                user.role === 'ADMIN' 
                  ? 'bg-purple-500/10 text-purple-400 border-purple-500/30' 
                  : user.role === 'CUSTOMER'
                  ? 'bg-teal-500/10 text-teal-400 border-teal-500/30'
                  : user.role === 'EMPLOYEE'
                  ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                  : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
              }`}>
                {user.role}
              </span>
            </div>

            {/* Profile Link */}
            <Link 
              to="/profile" 
              className="hidden md:flex items-center gap-2 px-4 py-2 text-slate-300 hover:text-teal-400 transition-colors font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Profile
            </Link>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 hover:border-red-500/50 font-bold rounded-lg transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;