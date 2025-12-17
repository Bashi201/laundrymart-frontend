# 🧺 LaundryMart Frontend

<div align="center">

![React](https://img.shields.io/badge/React-18+-61DAFB.svg?style=flat&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5+-646CFF.svg?style=flat&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React%20Router-v6-CA4245.svg?style=flat&logo=react-router&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-1.6+-5A29E4.svg?style=flat&logo=axios&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

A modern, responsive single-page application for comprehensive laundry management with role-based dashboards and seamless backend integration.

[Features](#-features) • [Demo](#-demo) • [Getting Started](#-getting-started) • [Documentation](#-documentation) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Demo](#-demo)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage Guide](#-usage-guide)
- [API Integration](#-api-integration)
- [Routing](#-routing)
- [State Management](#-state-management)
- [Styling](#-styling)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🎯 Overview

LaundryMart Frontend is a sleek, user-friendly web application that provides a complete laundry management experience. Built with React 18 and Vite for lightning-fast performance, it offers role-specific dashboards for Admins, Customers, Employees, and Riders, ensuring a tailored experience for each user type.

### Why LaundryMart?

- 🚀 **Lightning Fast**: Built with Vite for optimal development and production performance
- 🎨 **Modern UI**: Clean, dark-themed interface with responsive design
- 🔐 **Secure**: JWT-based authentication with protected routes
- 🎭 **Role-Based**: Customized dashboards for different user roles
- 📱 **Responsive**: Works seamlessly across desktop, tablet, and mobile devices
- 🔄 **Real-time**: Instant updates and seamless backend integration

---

## ✨ Features

### 🔐 Authentication & Security
- ✅ JWT-based authentication with secure token storage
- ✅ Persistent login sessions (localStorage)
- ✅ Automatic token refresh and validation
- ✅ Secure logout with session cleanup
- ✅ Protected routes with role-based access control

### 👥 User Management
- ✅ User registration with role selection
- ✅ Login with username/email and password
- ✅ Profile display in navbar
- ✅ Role-based dashboard routing

### 📊 Role-Based Dashboards

#### 👨‍💼 Admin Dashboard
- View and manage all users
- User statistics and analytics
- System-wide order overview
- User role management

#### 👤 Customer Dashboard
- Place new laundry orders
- View order history
- Track order status
- Manage delivery addresses

#### 👷 Employee Dashboard
- View assigned orders
- Update order status
- Manage daily tasks

#### 🏍️ Rider Dashboard
- View delivery assignments
- Update delivery status
- Route optimization

### 🎨 UI/UX Features
- ✅ Responsive navigation bar with user info
- ✅ Dynamic welcome messages
- ✅ Role badge display
- ✅ Clean, modern dark theme
- ✅ Smooth page transitions
- ✅ Loading states and error handling

---

## 🛠️ Tech Stack

<table>
  <tr>
    <th>Category</th>
    <th>Technology</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><strong>Framework</strong></td>
    <td>React 18+</td>
    <td>Modern UI library with hooks</td>
  </tr>
  <tr>
    <td><strong>Build Tool</strong></td>
    <td>Vite 5+</td>
    <td>Next-gen frontend tooling</td>
  </tr>
  <tr>
    <td><strong>Routing</strong></td>
    <td>React Router DOM v6</td>
    <td>Declarative routing for React</td>
  </tr>
  <tr>
    <td><strong>HTTP Client</strong></td>
    <td>Axios</td>
    <td>Promise-based HTTP client</td>
  </tr>
  <tr>
    <td><strong>State Management</strong></td>
    <td>React Hooks</td>
    <td>useState, useEffect, useContext</td>
  </tr>
  <tr>
    <td><strong>Styling</strong></td>
    <td>Custom CSS</td>
    <td>Modern dark theme with CSS3</td>
  </tr>
</table>

---

## 🎬 Demo

### Screenshots

#### Login Page
```
[Add screenshot here: /screenshots/login.png]
Modern login interface with email/password fields
```

#### Customer Dashboard
```
[Add screenshot here: /screenshots/customer-dashboard.png]
Order placement form with service selection
```

#### Admin Dashboard
```
[Add screenshot here: /screenshots/admin-dashboard.png]
User management panel with statistics
```

### Live Demo
🌐 [View Live Demo](https://laundrymart-demo.netlify.app) *(Coming Soon)*

---

## 📁 Project Structure

```
laundrymart-frontend/
├── public/
│   └── vite.svg                 # App icon
├── src/
│   ├── components/
│   │   ├── Layout.jsx           # Shared layout wrapper
│   │   ├── Navbar.jsx           # Dynamic navigation bar
│   │   ├── ProtectedRoute.jsx   # Route protection HOC
│   │   └── LoadingSpinner.jsx   # Loading component
│   ├── pages/
│   │   ├── Login.jsx            # Login page
│   │   ├── Register.jsx         # Registration page
│   │   ├── AdminDashboard.jsx   # Admin panel
│   │   ├── CustomerDashboard.jsx # Customer order page
│   │   ├── EmployeeDashboard.jsx # Employee task page
│   │   └── RiderDashboard.jsx   # Rider delivery page
│   ├── services/
│   │   └── api.js               # Axios instance & interceptors
│   ├── utils/
│   │   ├── auth.js              # Auth helper functions
│   │   └── constants.js         # App constants
│   ├── styles/
│   │   ├── index.css            # Global styles
│   │   └── theme.css            # Theme variables
│   ├── App.jsx                  # Main app component & routing
│   ├── main.jsx                 # React entry point
│   └── index.html               # HTML template
├── .env.example                 # Environment variables template
├── .gitignore                   # Git ignore rules
├── package.json                 # Dependencies
├── vite.config.js              # Vite configuration
└── README.md                    # This file
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** 9+ (comes with Node.js) or **yarn** or **pnpm**
- **Git** ([Download](https://git-scm.com/))

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/laundymart-frontend.git
cd laundymart-frontend
```

2. **Install dependencies**

```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install
```

3. **Create environment file**

```bash
cp .env.example .env
```

Edit `.env` and configure your backend API URL:

```env
VITE_API_BASE_URL=http://localhost:8080
VITE_APP_NAME=LaundryMart
```

4. **Start the development server**

```bash
npm run dev
```

The application will be available at `http://localhost:5173` 🎉

### Configuration

#### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:8080` |
| `VITE_APP_NAME` | Application name | `LaundryMart` |
| `VITE_TOKEN_KEY` | localStorage key for JWT | `laundrymart_token` |

#### Vite Configuration

The `vite.config.js` file includes:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
```

---

## 📖 Usage Guide

### User Registration

1. Navigate to `/register`
2. Fill in the registration form:
   - Username
   - Email
   - Password
   - Role (Customer, Employee, Rider)
3. Click "Register"
4. Automatically redirected to login

### User Login

1. Navigate to `/login`
2. Enter credentials:
   - Username or Email
   - Password
3. Click "Login"
4. Redirected to role-specific dashboard

### Customer Flow

1. **Login** as a customer
2. **Dashboard** displays order placement form
3. **Place Order**:
   - Select service type
   - Enter items and quantity
   - Provide pickup/delivery address
   - Choose pickup date
4. **Submit** order
5. **View** order confirmation

### Admin Flow

1. **Login** as an admin
2. **Dashboard** displays:
   - User list with roles
   - User management actions
   - System statistics
3. **Manage Users**:
   - View all users
   - Edit user details
   - Delete users
   - Assign roles

---

## 🔗 API Integration

### Backend Connection

This frontend integrates with the [LaundryMart Backend](https://github.com/yourusername/laundymart-backend).

**Backend Repository:** [laundymart-backend](https://github.com/yourusername/laundymart-backend)

### Axios Configuration

The `api.js` service configures Axios with JWT interceptors:

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor - Add JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('laundrymart_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('laundrymart_token');
      localStorage.removeItem('laundrymart_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

### API Endpoints Used

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/register` | POST | Register new user | No |
| `/login` | POST | User login | No |
| `/admin/users` | GET | Get all users | Yes (Admin) |
| `/admin/users/:id` | DELETE | Delete user | Yes (Admin) |
| `/customer/orders` | POST | Place order | Yes (Customer) |
| `/customer/orders` | GET | Get customer orders | Yes (Customer) |
| `/employee/orders` | GET | Get assigned orders | Yes (Employee) |
| `/rider/deliveries` | GET | Get delivery assignments | Yes (Rider) |

---

## 🛣️ Routing

### Route Structure

```javascript
// Public Routes
/login              → Login page
/register           → Registration page

// Protected Routes (require authentication)
/admin              → Admin dashboard (Admin only)
/customer           → Customer dashboard (Customer only)
/employee           → Employee dashboard (Employee only)
/rider              → Rider dashboard (Rider only)

// Redirect
/                   → Redirects to role-based dashboard
```

### Protected Route Implementation

```javascript
import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../utils/auth';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = getCurrentUser();
  const token = localStorage.getItem('laundrymart_token');

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
```

### Usage in App.jsx

```javascript
<Route
  path="/admin"
  element={
    <ProtectedRoute allowedRoles={['ADMIN']}>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>
```

---

## 🎨 Styling

### Theme Variables

The application uses CSS custom properties for theming:

```css
:root {
  /* Colors */
  --primary-color: #646cff;
  --secondary-color: #535bf2;
  --background-dark: #1a1a1a;
  --background-light: #242424;
  --text-primary: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.87);
  
  /* Spacing */
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2rem;
  --spacing-xl: 3rem;
  
  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
}
```

### Responsive Design

```css
/* Mobile First Approach */
.container {
  padding: 1rem;
}

/* Tablet */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    padding: 3rem;
    max-width: 1200px;
    margin: 0 auto;
  }
}
```

---

## 🗺️ Roadmap

### ✅ Phase 1 - Core Features (Completed)
- [x] User authentication (login/register)
- [x] JWT token management
- [x] Protected routes with role-based access
- [x] Basic dashboards for all roles
- [x] Order placement (Customer)
- [x] User management (Admin)

### 🚧 Phase 2 - Enhanced Features (In Progress)
- [ ] Order tracking with real-time updates
- [ ] Order history and details page
- [ ] Employee task management
- [ ] Rider delivery tracking
- [ ] Profile editing functionality
- [ ] Toast notifications for user feedback

### 📅 Phase 3 - Advanced Features (Planned)
- [ ] Real-time chat support
- [ ] Payment gateway integration
- [ ] Order status notifications
- [ ] Analytics and reporting dashboards
- [ ] Advanced search and filtering
- [ ] Export reports (PDF, CSV)

### 🔮 Phase 4 - Future Enhancements
- [ ] Mobile app (React Native)
- [ ] Progressive Web App (PWA)
- [ ] Multi-language support (i18n)
- [ ] Dark/Light theme toggle
- [ ] Accessibility improvements (WCAG 2.1)
- [ ] Performance optimization
- [ ] Unit and E2E testing

---

## 🤝 Contributing

Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**! 🎉

### How to Contribute

1. **Fork** the repository
2. **Create** your feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit** your changes
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push** to the branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open** a Pull Request

### Contribution Guidelines

- Follow React and JavaScript best practices
- Use functional components with hooks
- Write clean, readable code with comments
- Ensure responsive design for all components
- Test thoroughly before submitting PR
- Update documentation for new features
- Follow the existing code style

### Code Style

```javascript
// Use functional components
const MyComponent = () => {
  // Hooks at the top
  const [state, setState] = useState(null);
  
  useEffect(() => {
    // Side effects
  }, []);
  
  // Event handlers
  const handleClick = () => {
    // Logic here
  };
  
  // Return JSX
  return (
    <div className="my-component">
      {/* Content */}
    </div>
  );
};

export default MyComponent;
```

---

## 🐛 Bug Reports

Found a bug? Please open an issue with:

1. Clear title and description
2. Steps to reproduce
3. Expected vs actual behavior
4. Screenshots (if applicable)
5. Environment details (OS, browser, Node version)

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 LaundryMart

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 📞 Contact

**Project Maintainer:** Your Name

- 🐙 GitHub: [@yourusername](https://github.com/yourusername)
- 📧 Email: your.email@example.com
- 💼 LinkedIn: [Your Profile](https://linkedin.com/in/yourprofile)
- 🐦 Twitter: [@yourhandle](https://twitter.com/yourhandle)

**Project Links:**
- Frontend: [laundrymart-frontend](https://github.com/yourusername/laundrymart-frontend)
- Backend: [laundrymart-backend](https://github.com/yourusername/laundymart-backend)

---

## 🙏 Acknowledgments

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
- [MDN Web Docs](https://developer.mozilla.org/)
- All contributors and supporters of this project

---

## 📚 Additional Resources

### Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # Run ESLint

# Testing (when implemented)
npm run test             # Run tests
npm run test:coverage    # Test coverage report

# Deployment
npm run deploy           # Deploy to hosting
```

### Environment Setup

For different environments, create:
- `.env.development` - Development settings
- `.env.production` - Production settings
- `.env.staging` - Staging settings

---

<div align="center">

### 🧺 LaundryMart
**A clean, modern laundry experience from pickup to delivery**

Made with ❤️ by the LaundryMart Team

---

⭐ **Star this repo if you find it helpful!** ⭐

[Report Bug](https://github.com/yourusername/laundymart-frontend/issues) • [Request Feature](https://github.com/yourusername/laundymart-frontend/issues) • [Documentation](https://github.com/yourusername/laundymart-frontend/wiki)

</div>
