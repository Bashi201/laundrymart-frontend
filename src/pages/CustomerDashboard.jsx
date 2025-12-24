import React, { useState, useEffect } from 'react';
import { createOrder, updateProfile, getMyOrders } from '../services/api'; // Added missing import
import { getUser } from '../utils/auth';

const CustomerDashboard = () => {
  const [user, setUser] = useState(getUser()); // Changed to state for re-rendering on update
  const [orders, setOrders] = useState([]); // Updated: real orders from backend
  
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState('');
  const [message, setMessage] = useState('');

  // Added profile form state
  const [profileForm, setProfileForm] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    password: ''
  });

  const [profileMessage, setProfileMessage] = useState('');

  useEffect(() => {
    loadOrders(); // Added: fetch real orders on load
  }, []);

  // Added: function to load orders
  const loadOrders = async () => {
    try {
      const res = await getMyOrders();
      setOrders(res.data);
    } catch (err) {
      console.error('Failed to load orders:', err);
    }
  };

  const handlePlaceOrder = async () => {
    if (!orderDetails.trim()) {
      setMessage('Please enter order details');
      return;
    }

    try {
      await createOrder({ details: orderDetails });
      setMessage('Order placed successfully!');
      setOrderDetails('');
      setShowNewOrderModal(false);
      loadOrders(); // Added: refresh orders after placing new one
    } catch (err) {
      setMessage('Failed to place order. Try again.');
    }
  };

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
      // Update user state to refresh UI
      setUser(res.data.user);
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

  const getStatusIcon = (status) => {
    const icons = {
      'Pending': (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      'Processing': (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      'In Transit': (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      'Delivered': (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      'Cancelled': (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    };
    return icons[status] || icons['Pending'];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 py-8">
      <div className="container mx-auto px-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-white mb-2">
            Welcome back, <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">{user?.fullName?.split(' ')[0] || user?.username}</span>!
          </h1>
          <p className="text-slate-400">Manage your laundry orders and account settings</p>
        </div>

        {/* Quick Action Tiles */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* New Order Tile */}
          <button
            onClick={() => setShowNewOrderModal(true)}
            className="group relative bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl border border-teal-500/20 hover:border-teal-500/40 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/10 text-left"
          >
            <div className="absolute top-6 right-6 w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-500/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div className="pr-20">
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-teal-400 transition-colors">
                Place New Order
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Schedule a pickup and get your laundry cleaned in 24 hours
              </p>
            </div>
          </button>

          {/* Track Orders Tile */}
          <div className="group relative bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/10">
            <div className="absolute top-6 right-6 w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div className="pr-20">
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                Track Orders
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                View real-time status of all your active orders
              </p>
            </div>
          </div>

          {/* Profile Settings Tile */}
          <button
            onClick={() => setShowProfileModal(true)}
            className="group relative bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl border border-purple-500/20 hover:border-purple-500/40 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10 text-left"
          >
            <div className="absolute top-6 right-6 w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="pr-20">
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                Profile Settings
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Update your personal information and preferences
              </p>
            </div>
          </button>
        </div>

        {/* Orders Section */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl border border-slate-700/50 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-white">Your Orders</h2>
            <span className="px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-300 font-semibold">
              {orders.length} {orders.length === 1 ? 'Order' : 'Orders'}
            </span>
          </div>

          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="p-6 bg-slate-800/30 rounded-2xl border border-slate-700/30 hover:border-slate-600/50 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/30">
                      {getStatusIcon(order.status)}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xl font-black text-white">Order #{order.id}</span>
                        <span className={`px-3 py-1 rounded-lg text-sm font-semibold border ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-slate-400 text-sm mb-1">Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>
                      {order.assignedTo && (
                        <p className="text-slate-400 text-sm">Assigned to: <span className="text-teal-400 font-semibold">{order.assignedTo}</span></p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-700/30">
                  <p className="text-slate-300"><span className="text-slate-400">Details:</span> {order.details}</p>
                </div>
              </div>
            ))}
          </div>

          {orders.length === 0 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <p className="text-slate-400 mb-4">No orders yet</p>
              <button
                onClick={() => setShowNewOrderModal(true)}
                className="px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold rounded-lg hover:from-teal-400 hover:to-cyan-400 transition-all"
              >
                Place Your First Order
              </button>
            </div>
          )}
        </div>
      </div>

      {/* New Order Modal */}
        {showNewOrderModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-slate-900 rounded-2xl p-8 max-w-md w-full mx-4 border border-slate-700/50">
              <h2 className="text-xl font-bold mb-6 text-white">Place New Order</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Order Details</label>
                  <textarea
                    value={orderDetails}
                    onChange={(e) => setOrderDetails(e.target.value)}
                    rows="4"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all resize-none"
                    placeholder="e.g., 5 shirts, 2 pants, 3 towels - Wash & Fold"
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
                      setShowNewOrderModal(false);
                      setMessage('');
                    }}
                    className="flex-1 px-6 py-3 bg-slate-800 border border-slate-700 text-white font-bold rounded-xl hover:bg-slate-700 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl hover:from-blue-400 hover:to-blue-500 transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      {/* Profile Modal Placeholder */}
      {showProfileModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-slate-900 rounded-2xl p-8 max-w-md w-full mx-4 border border-slate-700/50">
              <h2 className="text-xl font-bold mb-6 text-white">Edit Profile</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={profileForm.fullName}
                    onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Address</label>
                  <textarea
                    value={profileForm.address}
                    onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                    rows="3"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">New Password (leave blank to keep current)</label>
                  <input
                    type="password"
                    value={profileForm.password}
                    onChange={(e) => setProfileForm({ ...profileForm, password: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
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

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowProfileModal(false)}
                    className="flex-1 px-6 py-3 bg-slate-800 border border-slate-700 text-white font-bold rounded-xl hover:bg-slate-700 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateProfile}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold rounded-xl hover:from-purple-400 hover:to-purple-500 transition-all shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default CustomerDashboard;