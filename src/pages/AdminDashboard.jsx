import React, { useEffect, useState } from 'react';
import { getUsers, register } from '../services/api';
import { getUser } from '../utils/auth';

const AdminDashboard = () => {
  const admin = getUser();
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showOrderDetailsModal, setShowOrderDetailsModal] = useState(false);
  
  // Form states
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    email: '',
    fullName: '',
    phone: '',
    address: '',
    role: 'EMPLOYEE'
  });
  const [message, setMessage] = useState('');

  // Mock data - replace with actual API calls
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 24,
    activeOrders: 12,
    revenue: 5420,
    employees: 0,
    riders: 0
  });

  const [orders, setOrders] = useState([
    { id: 1, customer: 'John Doe', status: 'Processing', items: '5 shirts, 2 pants', amount: 250, date: '2025-01-20' },
    { id: 2, customer: 'Jane Smith', status: 'In Transit', items: '3 towels', amount: 150, date: '2025-01-20' },
    { id: 3, customer: 'Bob Johnson', status: 'Pending', items: '2 jackets', amount: 400, date: '2025-01-19' },
  ]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
      
      // Update stats
      const employees = res.data.filter(u => u.role === 'EMPLOYEE').length;
      const riders = res.data.filter(u => u.role === 'RIDER').length;
      setStats(prev => ({
        ...prev,
        totalUsers: res.data.length,
        employees,
        riders
      }));
      setLoading(false);
    } catch (err) {
      console.error('Failed to load users:', err);
      setLoading(false);
    }
  };

  const handleAddUser = async () => {
    if (!newUser.username || !newUser.password || !newUser.email) {
      setMessage('Please fill in all required fields');
      return;
    }

    try {
      await register(newUser);
      setMessage('User added successfully!');
      setNewUser({
        username: '',
        password: '',
        email: '',
        fullName: '',
        phone: '',
        address: '',
        role: 'EMPLOYEE'
      });
      loadUsers();
      setTimeout(() => {
        setShowAddUserModal(false);
        setMessage('');
      }, 2000);
    } catch (err) {
      setMessage(err.response?.data || 'Failed to add user. Try again.');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'Pending': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
      'Processing': 'bg-blue-500/10 text-blue-400 border-blue-500/30',
      'In Transit': 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      'Delivered': 'bg-teal-500/10 text-teal-400 border-teal-500/30',
      'Cancelled': 'bg-red-500/10 text-red-400 border-red-500/30',
    };
    return colors[status] || colors['Pending'];
  };

  const getRoleBadgeColor = (role) => {
    const colors = {
      'ADMIN': 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      'CUSTOMER': 'bg-teal-500/10 text-teal-400 border-teal-500/30',
      'EMPLOYEE': 'bg-blue-500/10 text-blue-400 border-blue-500/30',
      'RIDER': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
    };
    return colors[role] || colors['CUSTOMER'];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 py-8">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-white mb-2">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Admin</span> Dashboard
          </h1>
          <p className="text-slate-400">Manage users, orders, and business operations</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl border border-purple-500/20">
            <div className="text-slate-400 text-sm mb-2">Total Users</div>
            <div className="text-3xl font-black text-purple-400">{stats.totalUsers}</div>
          </div>
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl border border-blue-500/20">
            <div className="text-slate-400 text-sm mb-2">Employees</div>
            <div className="text-3xl font-black text-blue-400">{stats.employees}</div>
          </div>
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl border border-cyan-500/20">
            <div className="text-slate-400 text-sm mb-2">Riders</div>
            <div className="text-3xl font-black text-cyan-400">{stats.riders}</div>
          </div>
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl border border-teal-500/20">
            <div className="text-slate-400 text-sm mb-2">Total Orders</div>
            <div className="text-3xl font-black text-teal-400">{stats.totalOrders}</div>
          </div>
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl border border-yellow-500/20">
            <div className="text-slate-400 text-sm mb-2">Active Orders</div>
            <div className="text-3xl font-black text-yellow-400">{stats.activeOrders}</div>
          </div>
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl border border-green-500/20">
            <div className="text-slate-400 text-sm mb-2">Revenue</div>
            <div className="text-3xl font-black text-green-400">${stats.revenue}</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {['overview', 'users', 'orders', 'profile'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-xl font-bold transition-all whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30'
                  : 'bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-6">
              <button
                onClick={() => setShowAddUserModal(true)}
                className="group bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl border border-blue-500/20 hover:border-blue-500/40 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10 text-left"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-blue-500/30">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  Add Employee/Rider
                </h3>
                <p className="text-slate-400 text-sm">Register new team members</p>
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className="group bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl border border-teal-500/20 hover:border-teal-500/40 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/10 text-left"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-teal-500/30">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-teal-400 transition-colors">
                  Manage Orders
                </h3>
                <p className="text-slate-400 text-sm">View and update order status</p>
              </button>

              <button
                onClick={() => setActiveTab('users')}
                className="group bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl border border-purple-500/20 hover:border-purple-500/40 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10 text-left"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-purple-500/30">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                  View All Users
                </h3>
                <p className="text-slate-400 text-sm">Manage user accounts</p>
              </button>
            </div>

            {/* Recent Orders */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl border border-slate-700/50 p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Recent Orders</h2>
              <div className="space-y-3">
                {orders.slice(0, 5).map((order) => (
                  <div
                    key={order.id}
                    className="bg-slate-800/30 rounded-xl border border-slate-700/50 p-4 hover:bg-slate-800/50 transition-all flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-white font-bold">#{order.id}</span>
                        <span className="text-slate-400 text-sm">{order.customer}</span>
                        <div className={`px-2 py-1 rounded-full border text-xs font-bold ${getStatusColor(order.status)}`}>
                          {order.status}
                        </div>
                      </div>
                      <p className="text-slate-400 text-sm">{order.items}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-teal-400 font-bold">${order.amount}</div>
                      <div className="text-slate-500 text-xs">{order.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl border border-slate-700/50 p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">User Management</h2>
              <button
                onClick={() => setShowAddUserModal(true)}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl hover:from-blue-400 hover:to-blue-500 transition-all shadow-lg shadow-blue-500/30 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add User
              </button>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700/50">
                      <th className="text-left py-4 px-4 text-slate-400 font-semibold">Username</th>
                      <th className="text-left py-4 px-4 text-slate-400 font-semibold">Full Name</th>
                      <th className="text-left py-4 px-4 text-slate-400 font-semibold">Email</th>
                      <th className="text-left py-4 px-4 text-slate-400 font-semibold">Role</th>
                      <th className="text-left py-4 px-4 text-slate-400 font-semibold">Phone</th>
                      <th className="text-right py-4 px-4 text-slate-400 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-all">
                        <td className="py-4 px-4 text-white font-medium">{user.username}</td>
                        <td className="py-4 px-4 text-slate-300">{user.fullName || '-'}</td>
                        <td className="py-4 px-4 text-slate-300">{user.email}</td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full border text-xs font-bold ${getRoleBadgeColor(user.role)}`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-slate-300">{user.phone || '-'}</td>
                        <td className="py-4 px-4 text-right">
                          <button className="px-3 py-1 text-cyan-400 hover:text-cyan-300 text-sm font-medium">
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl border border-slate-700/50 p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Order Management</h2>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg hover:text-teal-400 hover:border-teal-500/50 transition-all text-sm font-medium">
                  Filter
                </button>
                <button className="px-4 py-2 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg hover:text-teal-400 hover:border-teal-500/50 transition-all text-sm font-medium">
                  Export
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-slate-800/30 rounded-2xl border border-slate-700/50 p-6 hover:bg-slate-800/50 transition-all"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-slate-500 text-sm font-medium">Order #{order.id}</span>
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold ${getStatusColor(order.status)}`}>
                          {order.status}
                        </div>
                      </div>
                      <p className="text-white font-bold mb-2">{order.customer}</p>
                      <p className="text-slate-400 text-sm mb-2">{order.items}</p>
                      <div className="flex gap-4 text-sm text-slate-500">
                        <span>Date: {order.date}</span>
                        <span>Amount: ${order.amount}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <select className="px-4 py-2 bg-slate-800 border border-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/50 text-sm">
                        <option>Pending</option>
                        <option>Processing</option>
                        <option>In Transit</option>
                        <option>Delivered</option>
                        <option>Cancelled</option>
                      </select>
                      <button className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-all text-sm font-medium">
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl border border-purple-500/30 p-8 max-w-3xl">
            <h2 className="text-2xl font-bold text-white mb-6">Admin Profile</h2>
            
            <div className="space-y-6">
              <div className="flex items-center gap-6 p-6 bg-slate-800/30 rounded-2xl border border-slate-700/50">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-purple-500/30">
                  {admin?.fullName?.charAt(0) || admin?.username?.charAt(0) || 'A'}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{admin?.fullName || admin?.username}</h3>
                  <p className="text-slate-400 mb-2">{admin?.email}</p>
                  <span className="px-3 py-1 rounded-full border text-xs font-bold bg-purple-500/10 text-purple-400 border-purple-500/30">
                    ADMIN
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Full Name</label>
                <input
                  type="text"
                  defaultValue={admin?.fullName}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Email</label>
                <input
                  type="email"
                  defaultValue={admin?.email}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Phone</label>
                <input
                  type="tel"
                  defaultValue={admin?.phone}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Address</label>
                <textarea
                  defaultValue={admin?.address}
                  rows="3"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all resize-none"
                />
              </div>

              <div className="pt-4">
                <button className="w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl hover:from-purple-400 hover:to-pink-400 transition-all shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl border border-blue-500/30 max-w-2xl w-full p-8 shadow-2xl animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-white">Add New User</h2>
              <button
                onClick={() => {
                  setShowAddUserModal(false);
                  setMessage('');
                }}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Username <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={newUser.username}
                    onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                    placeholder="johndoe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Password <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Full Name</label>
                <input
                  type="text"
                  value={newUser.fullName}
                  onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={newUser.phone}
                    onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Role <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                  >
                    <option value="EMPLOYEE">Employee (Worker)</option>
                    <option value="RIDER">Rider (Delivery)</option>
                    <option value="CUSTOMER">Customer</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Address</label>
                <textarea
                  value={newUser.address}
                  onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
                  rows="3"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all resize-none"
                  placeholder="123 Main St, City, State 12345"
                />
              </div>

              {message && (
                <div className={`p-4 rounded-xl border ${
                  message.includes('success') 
                    ? 'bg-teal-500/10 border-teal-500/30 text-teal-400' 
                    : 'bg-red-500/10 border-red-500/30 text-red-400'
                }`}>
                  {message}
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowAddUserModal(false);
                    setMessage('');
                  }}
                  className="flex-1 px-6 py-3 bg-slate-800 border border-slate-700 text-white font-bold rounded-xl hover:bg-slate-700 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddUser}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl hover:from-blue-400 hover:to-blue-500 transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50"
                >
                  Add User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;