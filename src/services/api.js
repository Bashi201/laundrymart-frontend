// src/services/api.js

import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8080' });

// Automatically add JWT token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Auth endpoints
export const register = (user) => API.post('/register', user);
export const login = (user) => API.post('/login', user);

// Admin endpoints
export const getUsers = () => API.get('/admin/users');
export const getAdminOrders = () => API.get('/admin/orders');
export const assignRider = (orderId, riderId) => API.put(`/admin/orders/${orderId}/assign-rider`, { riderId });
export const assignEmployee = (orderId, employeeId) => API.put(`/admin/orders/${orderId}/assign-employee`, { employeeId });
export const updateOrderStatus = (orderId, status) => API.put(`/admin/orders/${orderId}/status`, { status });
export const deleteUser = (userId) => API.delete(`/admin/users/${userId}`);

// Customer endpoints
export const createOrder = (order) => API.post('/customer/orders', order);
export const getMyOrders = () => API.get('/customer/orders');

// Profile update endpoint
export const updateProfile = (profileData) => API.put('/profile', profileData);