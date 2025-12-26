import React, { useEffect, useState } from 'react';
import { getUsers, register, updateProfile, getAdminOrders, assignRider, assignEmployee, updateOrderStatus, deleteUser } from '../services/api';
import { getUser } from '../utils/auth';

const AdminDashboard = () => {
  const [admin, setAdmin] = useState(getUser());
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  
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

  // Profile form state
  const [profileForm, setProfileForm] = useState({
    fullName: admin?.fullName || '',
    email: admin?.email || '',
    phone: admin?.phone || '',
    address: admin?.address || '',
    password: ''
  });
  const [profileMessage, setProfileMessage] = useState('');

  // Stats
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    activeOrders: 0,
    revenue: 0,
    employees: 0,
    riders: 0
  });

  const [orders, setOrders] = useState([]);
  
  // Assignment states
  const [selectedRiders, setSelectedRiders] = useState({});
  const [selectedEmployees, setSelectedEmployees] = useState({});
  const [selectedStatus, setSelectedStatus] = useState({});
  
  // Search states
  const [userSearch, setUserSearch] = useState('');
  const [orderSearch, setOrderSearch] = useState('');
  
  // Toast notification state
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  
  // Show toast notification
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };

  useEffect(() => {
    loadUsers();
    loadOrders();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
      
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

  const loadOrders = async () => {
    try {
      const res = await getAdminOrders();
      setOrders(res.data);
      
      // Calculate revenue from actual orders
      const totalRevenue = res.data.reduce((sum, order) => sum + (order.amount || 0), 0);
      
      setStats(prev => ({
        ...prev,
        totalOrders: res.data.length,
        activeOrders: res.data.filter(o => o.status !== 'COMPLETED' && o.status !== 'DELIVERED').length,
        revenue: totalRevenue
      }));
    } catch (err) {
      console.error('Failed to load orders:', err);
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
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setAdmin(res.data.user);
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

  const openDeleteConfirmation = (user) => {
    setUserToDelete(user);
    setShowDeleteConfirm(true);
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;

    try {
      await deleteUser(userToDelete.id);
      showToast(`User "${userToDelete.username}" deleted successfully!`, 'success');
      setShowDeleteConfirm(false);
      setUserToDelete(null);
      await loadUsers(); // Reload the user list
    } catch (err) {
      console.error('Failed to delete user:', err);
      showToast(err.response?.data || 'Failed to delete user', 'error');
      setShowDeleteConfirm(false);
      setUserToDelete(null);
    }
  };

  const handleAssignRider = async (orderId) => {
    const riderId = selectedRiders[orderId];
    if (!riderId) {
      showToast('Please select a rider', 'error');
      return;
    }
    try {
      await assignRider(orderId, riderId);
      showToast('Rider assigned successfully!', 'success');
      await loadOrders(); // Wait for orders to reload
      setSelectedRiders(prev => ({ ...prev, [orderId]: '' }));
    } catch (err) {
      console.error('Failed to assign rider:', err);
      showToast('Failed to assign rider', 'error');
    }
  };

  const handleAssignEmployee = async (orderId) => {
    const employeeId = selectedEmployees[orderId];
    if (!employeeId) {
      showToast('Please select an employee', 'error');
      return;
    }
    try {
      await assignEmployee(orderId, employeeId);
      showToast('Employee assigned successfully!', 'success');
      await loadOrders(); // Wait for orders to reload
      setSelectedEmployees(prev => ({ ...prev, [orderId]: '' }));
    } catch (err) {
      console.error('Failed to assign employee:', err);
      showToast('Failed to assign employee', 'error');
    }
  };

  const handleUpdateStatus = async (orderId) => {
    const status = selectedStatus[orderId];
    const currentOrder = orders.find(o => o.id === orderId);
    
    if (!status) {
      showToast('Please select a status', 'error');
      return;
    }
    
    if (status === currentOrder?.status) {
      showToast('Please select a different status', 'error');
      return;
    }
    
    try {
      await updateOrderStatus(orderId, status);
      showToast('Order status updated successfully!', 'success');
      await loadOrders(); // Wait for orders to reload
      setSelectedStatus(prev => ({ ...prev, [orderId]: '' }));
    } catch (err) {
      console.error('Failed to update status:', err);
      showToast('Failed to update status', 'error');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'PENDING': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
      'Pending': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
      'PROCESSING': 'bg-blue-500/10 text-blue-400 border-blue-500/30',
      'Processing': 'bg-blue-500/10 text-blue-400 border-blue-500/30',
      'IN_TRANSIT': 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      'In Transit': 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      'DELIVERED': 'bg-teal-500/10 text-teal-400 border-teal-500/30',
      'Delivered': 'bg-teal-500/10 text-teal-400 border-teal-500/30',
      'COMPLETED': 'bg-green-500/10 text-green-400 border-green-500/30',
      'Completed': 'bg-green-500/10 text-green-400 border-green-500/30',
      'CANCELLED': 'bg-red-500/10 text-red-400 border-red-500/30',
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

  // Helper to safely get user display name
  const getUserDisplay = (user) => {
    if (!user) return 'N/A';
    if (typeof user === 'string') return user;
    return user.fullName || user.username || 'Unknown';
  };

  // Filter functions
  const filteredUsers = users.filter(u => {
    if (!userSearch) return true;
    const search = userSearch.toLowerCase();
    return (
      (u.fullName && u.fullName.toLowerCase().includes(search)) ||
      (u.username && u.username.toLowerCase().includes(search)) ||
      (u.email && u.email.toLowerCase().includes(search)) ||
      (u.phone && u.phone.toLowerCase().includes(search)) ||
      (u.role && u.role.toLowerCase().includes(search))
    );
  });

  const filteredOrders = orders.filter(o => {
    if (!orderSearch) return true;
    const search = orderSearch.toLowerCase();
    const customerName = getUserDisplay(o.customer).toLowerCase();
    const employeeName = getUserDisplay(o.assignedEmployee).toLowerCase();
    const riderName = getUserDisplay(o.assignedRider).toLowerCase();
    
    return (
      o.id.toString().includes(search) ||
      customerName.includes(search) ||
      (o.status && o.status.toLowerCase().includes(search)) ||
      (o.details && o.details.toLowerCase().includes(search)) ||
      employeeName.includes(search) ||
      riderName.includes(search)
    );
  });

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
              {orders.length === 0 ? (
                <div className="text-center py-8 text-slate-400">No orders yet</div>
              ) : (
                <div className="space-y-3">
                  {orders.slice(0, 5).map((order) => (
                    <div
                      key={order.id}
                      className="bg-slate-800/30 rounded-xl border border-slate-700/50 p-4 hover:bg-slate-800/50 transition-all flex items-center justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-white font-bold">#{order.id}</span>
                          <span className="text-slate-400 text-sm">{getUserDisplay(order.customer)}</span>
                          <div className={`px-2 py-1 rounded-full border text-xs font-bold ${getStatusColor(order.status)}`}>
                            {order.status}
                          </div>
                        </div>
                        <p className="text-slate-400 text-sm">{order.details || order.items || 'Order details'}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-teal-400 font-bold">${order.amount || 0}</div>
                        <div className="text-slate-500 text-xs">
                          {order.date || new Date(order.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <h2 className="text-2xl font-bold text-white">User Management</h2>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                {/* Search Bar */}
                <div className="relative flex-1 md:w-80">
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    className="w-full px-4 py-3 pl-11 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                  />
                  <svg 
                    className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <button
                  onClick={() => setShowAddUserModal(true)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl hover:from-blue-400 hover:to-blue-500 transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add User
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {[
                { title: 'Employees', value: stats.employees, color: 'blue' },
                { title: 'Riders', value: stats.riders, color: 'purple' },
                { title: 'Customers', value: stats.totalUsers - stats.employees - stats.riders - 1, color: 'green' },
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
                  {filteredUsers.filter(u => u.role !== 'ADMIN').length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                          </div>
                          <p className="text-slate-400 mb-4">No users found matching "{userSearch}"</p>
                          <button
                            onClick={() => setUserSearch('')}
                            className="px-4 py-2 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg hover:text-white hover:border-slate-600 transition-all"
                          >
                            Clear Search
                          </button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.filter(u => u.role !== 'ADMIN').map(user => (
                      <tr key={user.id} className="border-b border-slate-700/50 last:border-0 hover:bg-slate-700/50 transition-all">
                        <td className="px-6 py-4">
                          <div className="font-semibold text-white">{user.fullName || user.username}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getRoleBadgeColor(user.role)}`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-300">{user.email}</td>
                        <td className="px-6 py-4 text-slate-300">{user.phone || 'N/A'}</td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => openDeleteConfirmation(user)}
                            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all group"
                            title="Delete user"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl border border-slate-700/50 p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
              <h2 className="text-2xl font-bold text-white">Order Management</h2>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
                {/* Search Bar */}
                <div className="relative flex-1 md:w-96">
                  <input
                    type="text"
                    placeholder="Search by order ID, customer, status..."
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    className="w-full px-4 py-3 pl-11 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all"
                  />
                  <svg 
                    className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div className="text-slate-400 text-sm whitespace-nowrap self-center">
                  {filteredOrders.length} of {orders.length} orders
                </div>
              </div>
            </div>

            {orders.length === 0 ? (
              <div className="text-center py-12 text-slate-400">No orders to display</div>
            ) : filteredOrders.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <p className="text-slate-400">No orders found matching "{orderSearch}"</p>
                <button
                  onClick={() => setOrderSearch('')}
                  className="mt-4 px-4 py-2 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg hover:text-white hover:border-slate-600 transition-all"
                >
                  Clear Search
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order) => {
                  const riders = users.filter(u => u.role === 'RIDER');
                  const employees = users.filter(u => u.role === 'EMPLOYEE');
                  
                  return (
                    <div
                      key={order.id}
                      className="bg-slate-800/30 rounded-2xl border border-slate-700/50 p-6 hover:bg-slate-800/50 transition-all"
                    >
                      <div className="grid lg:grid-cols-2 gap-6">
                        {/* Left side - Order Info */}
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-slate-500 text-sm font-medium">Order #{order.id}</span>
                            <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold ${getStatusColor(order.status)}`}>
                              {order.status}
                            </div>
                          </div>
                          <p className="text-white font-bold mb-2">Customer: {getUserDisplay(order.customer)}</p>
                          <p className="text-slate-400 text-sm mb-2">Details: {order.details || order.items || 'No details'}</p>
                          <div className="flex gap-4 text-sm text-slate-500 mb-3">
                            <span>Date: {order.date || new Date(order.createdAt).toLocaleDateString()}</span>
                            <span>Amount: ${order.amount || 0}</span>
                          </div>
                          
                          {/* Show current assignments */}
                          <div className="space-y-2 mt-4">
                            {order.assignedEmployee && (
                              <div className="text-sm text-slate-400">
                                <span className="text-blue-400">Employee:</span> {getUserDisplay(order.assignedEmployee)}
                              </div>
                            )}
                            {order.assignedRider && (
                              <div className="text-sm text-slate-400">
                                <span className="text-cyan-400">Rider:</span> {getUserDisplay(order.assignedRider)}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Right side - Assignment Controls */}
                        <div className="space-y-4">
                          {/* Update Status */}
                          <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-2">
                              Update Order Status 
                              <span className="ml-2 text-xs text-slate-500">(Current: {order.status})</span>
                            </label>
                            <div className="flex gap-2">
                              <select
                                value={selectedStatus[order.id] || order.status}
                                onChange={(e) => setSelectedStatus({ ...selectedStatus, [order.id]: e.target.value })}
                                className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-sm"
                              >
                                <option value="PENDING">Pending</option>
                                <option value="PROCESSING">Processing</option>
                                <option value="IN_TRANSIT">In Transit</option>
                                <option value="DELIVERED">Delivered</option>
                                <option value="COMPLETED">Completed</option>
                                <option value="CANCELLED">Cancelled</option>
                              </select>
                              <button
                                onClick={() => handleUpdateStatus(order.id)}
                                disabled={!selectedStatus[order.id] || selectedStatus[order.id] === order.status}
                                className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-all text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                Update
                              </button>
                            </div>
                          </div>

                          {/* Assign Employee */}
                          <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-2">
                              Assign Employee
                              {order.assignedEmployee && (
                                <span className="ml-2 text-xs text-slate-500">
                                  (Current: {getUserDisplay(order.assignedEmployee)})
                                </span>
                              )}
                            </label>
                            <div className="flex gap-2">
                              <select
                                value={selectedEmployees[order.id] || ''}
                                onChange={(e) => setSelectedEmployees({ ...selectedEmployees, [order.id]: e.target.value })}
                                className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
                              >
                                <option value="">
                                  {order.assignedEmployee ? 'Change Employee' : 'Select Employee'}
                                </option>
                                {employees.map(emp => (
                                  <option key={emp.id} value={emp.id}>
                                    {emp.fullName || emp.username}
                                  </option>
                                ))}
                              </select>
                              <button
                                onClick={() => handleAssignEmployee(order.id)}
                                disabled={!selectedEmployees[order.id]}
                                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                Assign
                              </button>
                            </div>
                          </div>

                          {/* Assign Rider */}
                          <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-2">
                              Assign Rider
                              {order.assignedRider && (
                                <span className="ml-2 text-xs text-slate-500">
                                  (Current: {getUserDisplay(order.assignedRider)})
                                </span>
                              )}
                            </label>
                            <div className="flex gap-2">
                              <select
                                value={selectedRiders[order.id] || ''}
                                onChange={(e) => setSelectedRiders({ ...selectedRiders, [order.id]: e.target.value })}
                                className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-sm"
                              >
                                <option value="">
                                  {order.assignedRider ? 'Change Rider' : 'Select Rider'}
                                </option>
                                {riders.map(rider => (
                                  <option key={rider.id} value={rider.id}>
                                    {rider.fullName || rider.username}
                                  </option>
                                ))}
                              </select>
                              <button
                                onClick={() => handleAssignRider(order.id)}
                                disabled={!selectedRiders[order.id]}
                                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-all text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                Assign
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6">Admin Profile</h2>
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl border border-slate-700/50 p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-3xl font-bold">
                  {admin?.fullName?.[0]?.toUpperCase() || admin?.username?.[0]?.toUpperCase() || 'A'}
                </div>
                <div>
                  <h3 className="font-bold text-xl text-white">{admin?.fullName || admin?.username || 'Admin'}</h3>
                  <p className="text-slate-400">{admin?.email}</p>
                  <span className="inline-block mt-1 px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30">
                    {admin?.role}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={profileForm.fullName}
                    onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Address</label>
                  <input
                    type="text"
                    value={profileForm.address}
                    onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">New Password (leave blank to keep current)</label>
                  <input
                    type="password"
                    value={profileForm.password}
                    onChange={(e) => setProfileForm({ ...profileForm, password: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
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
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl border border-blue-500/30 max-w-2xl w-full p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
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

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && userToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl border border-red-500/30 max-w-md w-full p-8 shadow-2xl">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-white text-center mb-4">Delete User?</h2>
            
            <p className="text-slate-300 text-center mb-6">
              Are you sure you want to delete user <span className="font-semibold text-white">"{userToDelete.username}"</span>? 
              This action cannot be undone.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setUserToDelete(null);
                }}
                className="flex-1 px-6 py-3 bg-slate-800 border border-slate-700 text-white font-bold rounded-xl hover:bg-slate-700 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteUser}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-xl hover:from-red-400 hover:to-red-500 transition-all shadow-lg shadow-red-500/30 hover:shadow-red-500/50"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-5 duration-300">
          <div className={`px-6 py-4 rounded-xl shadow-2xl border ${
            toast.type === 'success' 
              ? 'bg-teal-500/10 border-teal-500/50 text-teal-400' 
              : toast.type === 'error'
              ? 'bg-red-500/10 border-red-500/50 text-red-400'
              : 'bg-blue-500/10 border-blue-500/50 text-blue-400'
          } backdrop-blur-xl`}>
            <div className="flex items-center gap-3">
              {toast.type === 'success' && (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              {toast.type === 'error' && (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              <span className="font-semibold">{toast.message}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;