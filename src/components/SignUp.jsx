import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircleIcon, UserIcon, CodeBracketIcon, LinkIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../App';

export default function SignUp({ isActive }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!name || !email || !password) {
      setError('All fields are required');
      return;
    }

    try {
      setLoading(true);
      
      // Create a RegisterRequest object
      const registerRequest = {
        Name: name,
        Email: email,
        PasswordHash: password // This will be hashed in the backend
      };

      // Send the RegisterRequest object to the backend
      await signup(registerRequest);

      // Navigate to login page after successful registration
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`absolute top-0 h-full transition-all duration-600 ease-in-out ${isActive ? 'left-1/2 w-1/2 z-5' : 'left-0 opacity-0 z-1'}`}>
      <form onSubmit={handleSubmit} className="bg-white flex flex-col items-center justify-center h-full px-10">
        <h1 className="text-3xl font-bold mb-4">Create Account</h1>
        
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        
        <div className="flex space-x-3 mb-5">
          <a href="#" className="border border-gray-300 rounded-lg p-2"><PlusCircleIcon className="w-5 h-5" /></a>
          <a href="#" className="border border-gray-300 rounded-lg p-2"><UserIcon className="w-5 h-5" /></a>
          <a href="#" className="border border-gray-300 rounded-lg p-2"><CodeBracketIcon className="w-5 h-5" /></a>
          <a href="#" className="border border-gray-300 rounded-lg p-2"><LinkIcon className="w-5 h-5" /></a>
        </div>
        
        <span className="text-xs mb-4">or use email for registration</span>
        
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          className="bg-gray-100 border-none mb-2 p-3 text-sm rounded-lg w-full outline-none" 
          disabled={loading}
        />
        
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="bg-gray-100 border-none mb-2 p-3 text-sm rounded-lg w-full outline-none" 
          disabled={loading}
        />
        
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className="bg-gray-100 border-none mb-2 p-3 text-sm rounded-lg w-full outline-none" 
          disabled={loading}
        />
        
        <button 
          type="submit" 
          className={`bg-black text-white text-xs py-2 px-8 rounded-lg font-semibold uppercase tracking-wide mt-4 cursor-pointer ${loading ? 'opacity-70' : ''}`}
          disabled={loading}
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
}
