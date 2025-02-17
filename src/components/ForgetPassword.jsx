import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../API/authService';  // Assuming authService handles the forgot password API request

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

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
      const response = await authService.forgotPassword({ email }); // Make sure `authService.forgotPassword` matches your backend API
      setMessage(response.message || 'Password reset link sent to your email.');
    } catch (err) {
      setError(err.message || 'Failed to send password reset link.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/public/foodatreset.jpg')" }}>
      <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-3xl shadow-lg overflow-hidden w-full max-w-md p-10">
        <form onSubmit={handleForgotPassword} className="flex flex-col items-center justify-center h-full">
          <h1 className="text-3xl font-bold mb-4">Forgot Password</h1>
          
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
          {message && <div className="text-green-500 text-sm mb-4">{message}</div>}
          
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
  );
}
