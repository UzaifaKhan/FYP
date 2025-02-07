import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  PlusCircleIcon, 
  UserIcon, 
  CodeBracketIcon, 
  LinkIcon, 
  Bars3Icon,
  XMarkIcon 
} from '@heroicons/react/24/outline';
import { useAuth } from '../App';
import authService from '../API/authService';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email) {
      setError('Please enter your email');
      return;
    }

    try {
      setLoading(true);
      const response = await authService.forgetPassword(email);
      setMessage(response.message || 'Password reset link sent to your email');
    } catch (err) {
      setError(typeof err === 'object' ? err.message : 'Failed to send password reset link');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-black shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div to="/" className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-white">Voice Of Customer</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden sm:flex sm:items-center sm:space-x-4">
              <Link to="/Home" className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link>
              {!isAuthenticated ? (
                <>
                  <Link to="/login" className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium">
                    Login
                  </Link>
                  <Link to="/signup" className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium">
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/dashboard" className="textwhite hover:text-black px-3 py-2 rounded-md text-sm font-medium">
                    Dashboard
                  </Link>
                  <button 
                    onClick={handleLogout} 
                    className="textwhite hover:text-black px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="-mr-2 flex items-center sm:hidden">
              <button
                onClick={toggleMobileMenu}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <Link 
                to="/" 
                className="textwhite hover:bg-gray-50 hover:text-black block px-3 py-2 rounded-md text-base font-medium"
              >
                Home
              </Link>
              {!isAuthenticated ? (
                <>
                  <Link 
                    to="/login" 
                    className="textwhite hover:bg-gray-50 hover:text-black block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/signup" 
                    className="textwhite hover:bg-gray-50 hover:text-black block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  <Link 
                    to="/dashboard" 
                    className="textwhite hover:bg-gray-50 hover:text-black block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Dashboard
                  </Link>
                  <button 
                    onClick={handleLogout} 
                    className="textwhite hover:bg-gray-50 hover:text-black block px-3 py-2 rounded-md text-base font-medium w-full text-left"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

 {/* Forgot Password Form with Background */}
 <div 
        className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/public/foodatreset.jpg')", // Replace with your image path
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: 'calc(100vh - 64px)' // Subtract navbar height
        }}
      >
        <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-3xl shadow-lg overflow-hidden w-full max-w-md p-10">
          <form onSubmit={handleForgotPassword} className="flex flex-col items-center justify-center h-full">
            <h1 className="text-3xl font-bold mb-4">Forgot Password</h1>
            
            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
            {message && <div className="text-green-500 text-sm mb-4">{message}</div>}
            
            <div className="flex space-x-3 mb-5">
              <a href="#" className="border border-gray-300 rounded-lg p-2 bg-white"><PlusCircleIcon className="w-5 h-5" /></a>
              <a href="#" className="border border-gray-300 rounded-lg p-2 bg-white"><UserIcon className="w-5 h-5" /></a>
              <a href="#" className="border border-gray-300 rounded-lg p-2 bg-white"><CodeBracketIcon className="w-5 h-5" /></a>
              <a href="#" className="border border-gray-300 rounded-lg p-2 bg-white"><LinkIcon className="w-5 h-5" /></a>
            </div>
            
            <span className="text-xs mb-4">Enter your email to reset password</span>
            
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="bg-gray-100 border-none mb-2 p-3 text-sm rounded-lg w-full outline-none" 
              disabled={loading}
              required
            />
            
            <div className="flex space-x-4 mt-4 w-full justify-center">
              <button 
                type="button"
                onClick={handleBackToLogin}
                className="text-sm text-gray-600 hover:text-black"
                disabled={loading}
              >
                Back to Login
              </button>

              <button 
                type="submit" 
                className={`bg-black text-white text-xs py-2 px-8 rounded-lg font-semibold uppercase tracking-wide cursor-pointer ${loading ? 'opacity-70' : ''}`}
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Reset Password'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}