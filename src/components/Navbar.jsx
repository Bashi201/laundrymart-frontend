// Enhanced Navbar.jsx - Clean, Modern Navigation
import React, { useState, useEffect } from 'react';
import { getUser, logout } from '../utils/auth';
import { useNavigate, Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const user = getUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Determine dashboard path based on user role
  let dashboardPath = '/';
  if (user) {
    if (user.role === 'ADMIN') dashboardPath = '/admin';
    else if (user.role === 'CUSTOMER') dashboardPath = '/customer';
    else if (user.role === 'EMPLOYEE') dashboardPath = '/employee';
    else if (user.role === 'RIDER') dashboardPath = '/rider';
  }

  // Get first name from full name or username
  const getFirstName = () => {
    if (!user) return '';
    const fullName = user.fullName || user.username;
    return fullName.split(' ')[0];
  };

  // Navigation links - simplified when logged in
  const publicLinks = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/pricing', label: 'Pricing' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  const authenticatedLinks = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/pricing', label: 'Pricing' },
    { path: '/contact', label: 'Contact' },
  ];

  const navLinks = user ? authenticatedLinks : publicLinks;

  // Check if link is active
  const isActive = (path) => location.pathname === path;

  // Get role badge styling
  const getRoleBadgeStyle = (role) => {
    const styles = {
      ADMIN: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      CUSTOMER: 'bg-teal-500/10 text-teal-400 border-teal-500/30',
      EMPLOYEE: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
      RIDER: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
    };
    return styles[role] || styles.CUSTOMER;
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-slate-950/95 backdrop-blur-xl border-b border-teal-500/30 shadow-2xl shadow-teal-500/5' 
        : 'bg-slate-950/80 backdrop-blur-xl border-b border-teal-500/20'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3 group relative z-10">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl blur opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative w-11 h-11 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent group-hover:from-teal-300 group-hover:to-cyan-300 transition-all">
                LaundryMart
              </span>
              {user && (
                <span className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase">
                  {user.role} Portal
                </span>
              )}
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Navigation Links */}
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? 'text-teal-400'
                    : 'text-slate-300 hover:text-teal-400'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {user ? (
              // Authenticated User Section - Cleaner Layout
              <>
                {/* Dashboard Link with Icon */}
                <Link
                  to={dashboardPath}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isActive(dashboardPath)
                      ? 'text-teal-400 bg-teal-500/10'
                      : 'text-slate-300 hover:text-teal-400 hover:bg-slate-800/30'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  Dashboard
                </Link>

                {/* User Section - Modern & Compact */}
                <div className="flex items-center gap-3 ml-2 pl-3 border-l border-slate-700/50">
                  {/* Role Badge */}
                  <div className={`px-3 py-1 rounded-full text-[11px] font-bold border uppercase tracking-wide ${getRoleBadgeStyle(user.role)}`}>
                    {user.role}
                  </div>

                  {/* User Profile Link - No Dropdown Arrow */}
                  <Link
                    to="/profile"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-800/50 transition-all group"
                  >
                    {/* Avatar */}
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-teal-500/30 group-hover:scale-110 transition-transform ring-2 ring-teal-500/20">
                      {getFirstName().charAt(0).toUpperCase()}
                    </div>
                    
                    {/* First Name Only */}
                    <span className="text-sm font-bold text-white group-hover:text-teal-400 transition-colors">
                      {getFirstName()}
                    </span>
                  </Link>

                  {/* Logout Button - RED */}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition-all hover:scale-105 shadow-lg shadow-red-500/30 hover:shadow-red-500/50"
                    title="Logout"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </button>
                </div>
              </>
            ) : (
              // Guest User Section
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-5 py-2 text-slate-300 hover:text-white font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="relative px-6 py-2.5 font-bold rounded-lg overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 group-hover:from-teal-400 group-hover:to-cyan-400 transition-all"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 blur opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  <span className="relative text-white flex items-center gap-2">
                    Sign Up
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 text-slate-300 hover:text-teal-400 hover:bg-slate-800/50 rounded-lg transition-all"
            aria-label="Toggle menu"
          >
            <svg className={`w-6 h-6 transition-transform duration-300 ${mobileMenuOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-6 animate-in slide-in-from-top-4 duration-300">
            <div className="space-y-1 pt-4 border-t border-slate-800">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-3 rounded-lg font-medium transition-all ${
                    isActive(link.path)
                      ? 'text-teal-400 bg-teal-500/10'
                      : 'text-slate-300 hover:text-teal-400 hover:bg-slate-800/50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {user ? (
                <>
                  <Link
                    to={dashboardPath}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                      isActive(dashboardPath)
                        ? 'text-teal-400 bg-teal-500/10'
                        : 'text-slate-300 hover:text-teal-400 hover:bg-slate-800/50'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    Dashboard
                  </Link>

                  <Link
                    to="/profile"
                    className="block px-4 py-3 rounded-lg font-medium text-slate-300 hover:text-teal-400 hover:bg-slate-800/50 transition-all"
                  >
                    Profile
                  </Link>

                  {/* User Info Card */}
                  <div className="mt-4 p-4 bg-slate-800/30 rounded-xl border border-slate-700/50">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white font-bold shadow-lg shadow-teal-500/30 ring-2 ring-teal-500/20">
                        {getFirstName().charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-white">
                          {getFirstName()}
                        </p>
                        <p className="text-xs text-slate-400">
                          {user.email || user.username}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[11px] font-bold border uppercase ${getRoleBadgeStyle(user.role)}`}>
                        {user.role}
                      </span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition-all shadow-lg shadow-red-500/30 hover:shadow-red-500/50"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className="pt-4 space-y-3 border-t border-slate-800 mt-4">
                  <Link
                    to="/login"
                    className="block w-full px-5 py-3 text-center text-slate-300 hover:text-white transition-colors font-medium border border-slate-700 rounded-lg hover:border-slate-600"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block w-full px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold rounded-lg hover:from-teal-400 hover:to-cyan-400 transition-all shadow-lg shadow-teal-500/30 text-center"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;