import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, createContext, useContext, useEffect } from 'react';
import Dashboard from './Dashboard';
import LoginSignup from './components/LoginSignup';
import authService from './API/authService';
import Home from './components/Home';
import BusinessAccount from './Pages/BusinessAccount';
import ForgotPassword from './components/ForgotPassword';
import UpdateProfile from './Pages/UpdateProfile';
import Settings from './Pages/Settings';
import AddRestaurant from './Pages/AddRestaurant';
import Restaurant from './Pages/Restaurant';

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      setError(null);
      const response = await authService.login(credentials);
      if (response?.token) {
        localStorage.setItem('token', response.token);
        setIsAuthenticated(true);
        return response;
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const signup = async (userData) => {
    try {
      setError(null);
      const response = await authService.signup(userData);
      if (response?.token) {
        localStorage.setItem('token', response.token);
        setIsAuthenticated(true);
        return response;
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, signup, loading, error }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/update-profile" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/home/business-account" element={<ProtectedRoute><BusinessAccount /></ProtectedRoute>} />
          <Route path="/home/add-restaurant" element={<ProtectedRoute><AddRestaurant /></ProtectedRoute>} />
          <Route path="/restaurant" element={<ProtectedRoute><Restaurant /></ProtectedRoute>} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
