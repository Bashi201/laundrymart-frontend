import React, { useEffect, useState } from 'react';
import { getUsers, register, updateProfile } from '../services/api'; // Added updateProfile import
import { getUser } from '../utils/auth';

const AdminDashboard = () => {
  const [admin, setAdmin] = useState(getUser()); // Changed to state for re-rendering on update
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

  // Added profile form state
  const [profileForm, setProfileForm] = useState({
    fullName: admin?.fullName || '',
    email: admin?.email || '',
    phone: admin?.phone || '',
    address: admin?.address || '',
    password: ''
  });
  const [profileMessage, setProfileMessage] = useState('');

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

  const [profileData, setProfileData] = useState({
  email: admin?.email || '',
  fullName: admin?.fullName || '',
  phone: admin?.phone || '',
  address: admin?.address || '',
  password: '',
});

// Added handleUpdateProfile function
  const handleUpdateProfile = async () => {
    const updateData = {
      fullName: profileForm.fullName.trim() || undefined,
      email: profileForm.email.trim(),
      phone: profileForm.phone.trim() || undefined,
      address: profileForm.address.trim() || undefined,
      password: profileForm.password.trim() || undefined
    };

    try {
      const res = await updateProfile(updateData);
      setProfileMessage(res.data.message);
      // Update localStorage
      localStorage.setItem('user', JSON.stringify(res.data.user));
      // Update admin state to refresh UI
      setAdmin(res.data.user);
      // Reset form password and update with new values
      setProfileForm({
        fullName: res.data.user.fullName,
        email: res.data.user.email,
        phone: res.data.user.phone,
        address: res.data.user.address,
        password: ''
      });
      setTimeout(() => setProfileMessage(''), 3000);
    } catch (err) {
      setProfileMessage(err.response?.data || 'Failed to update profile. Try again.');
    }
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
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">User Management</h2>
            <button
              onClick={() => setShowAddUserModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl hover:from-blue-400 hover:to-blue-500 transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 flex items-center gap-2"
            >
              Add New User
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[
              { title: 'Employees', value: stats.employees, color: 'blue' },
              { title: 'Riders', value: stats.riders, color: 'purple' },
              { title: 'Customers', value: stats.totalUsers - stats.employees - stats.riders - 1, color: 'green' },  // -1 for admin
            ].map(stat => (
              <div key={stat.title} className={`p-6 bg-${stat.color}-500/10 rounded-xl border border-${stat.color}-500/20`}>
                <h3 className="text-slate-300 mb-2">{stat.title}</h3>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="overflow-x-auto bg-slate-800/50 rounded-xl border border-slate-700/50">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700/50">
                  <th className="px-6 py-4 text-left text-slate-400">User</th>
                  <th className="px-6 py-4 text-left text-slate-400">Role</th>
                  <th className="px-6 py-4 text-left text-slate-400">Email</th>
                  <th className="px-6 py-4 text-left text-slate-400">Phone</th>
                  <th className="px-6 py-4 text-left text-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.filter(u => u.role !== 'ADMIN').map(user => (
                  <tr key={user.id} className="border-b border-slate-700/50 last:border-0 hover:bg-slate-700/50 transition-all">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-white">{user.fullName || user.username}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        user.role === 'EMPLOYEE' ? 'bg-blue-500/10 text-blue-400' :
                        user.role === 'RIDER' ? 'bg-purple-500/10 text-purple-400' :
                        'bg-green-500/10 text-green-400'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-300">{user.email}</td>
                    <td className="px-6 py-4 text-slate-300">{user.phone || 'N/A'}</td>
                    <td className="px-6 py-4">
                      <button className="text-blue-400 hover:text-blue-300 mr-4">Edit</button>
                      <button className="text-red-400 hover:text-red-300">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
          <div className="max-w-md">
            <h2 className="text-xl font-bold mb-6">Admin Profile</h2>
            <div className="rounded-xl bg-slate-800/50 p-6 border border-slate-700/50">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold">
                  {admin?.fullName?.[0] || 'A'}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{admin?.fullName || 'Admin'}</h3>
                  <p className="text-slate-400">{admin?.email}</p>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">{admin?.role}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={profileForm.fullName}
                    onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Address</label>
                  <input
                    type="text"
                    value={profileForm.address}
                    onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">New Password (leave blank to keep current)</label>
                  <input
                    type="password"
                    value={profileForm.password}
                    onChange={(e) => setProfileForm({ ...profileForm, password: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                  />
                </div>

                {profileMessage && (
                  <div className={`p-4 rounded-xl border ${
                    profileMessage.includes('success') 
                      ? 'bg-teal-500/10 border-teal-500/30 text-teal-400' 
                      : 'bg-red-500/10 border-red-500/30 text-red-400'
                  }`}>
                    {profileMessage}
                  </div>
                )}

                <button
                  onClick={handleUpdateProfile}
                  className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl hover:from-purple-400 hover:to-pink-400 transition-all shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50"
                >
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