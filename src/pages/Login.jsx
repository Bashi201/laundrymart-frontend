// Updated Login.jsx
import React, { useState } from 'react';
import { login } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await login({ username, password });
      const { token, user } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Redirect to home for all roles
      navigate('/');
      
    } catch (err) {
      setError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      {/* Login Card */}
      <div className="w-full max-w-md relative z-10">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center justify-center gap-3 group">
            <div className="w-14 h-14 bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-500/30 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <span className="text-3xl font-black bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              LaundryMart
            </span>
          </Link>
          <h2 className="text-3xl font-bold text-white mt-6 mb-2">Welcome Back!</h2>
          <p className="text-slate-400">Sign in to manage your laundry</p>
        </div>

        {/* Login Form Card */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl shadow-2xl border border-teal-500/20 p-8 backdrop-blur-sm">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Username Input */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-300">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-300">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all"
                  required
                />
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-sm text-teal-400 hover:text-teal-300 transition-colors font-medium">
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold rounded-xl hover:from-teal-400 hover:to-cyan-400 transition-all shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Signing in...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-slate-700/50"></div>
            <span className="text-slate-500 text-sm">or</span>
            <div className="flex-1 h-px bg-slate-700/50"></div>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-slate-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-teal-400 hover:text-teal-300 font-bold transition-colors">
              Sign up now
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link to="/" className="text-slate-400 hover:text-teal-400 transition-colors text-sm font-medium">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;