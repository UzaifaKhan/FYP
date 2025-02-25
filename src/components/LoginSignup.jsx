import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { useAuth } from '../App';
import backgroundImage from '../assets/home.jpeg';

export default function LoginSignup() {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Use useEffect to handle navigation after the component renders
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]); // Add dependencies to avoid unnecessary re-renders

  const toggleActive = () => {
    setIsActive(!isActive);
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        className={`bg-white rounded-3xl shadow-lg overflow-hidden relative w-[768px] max-w-full min-h-[480px] ${
          isActive ? 'active' : ''
        }`}
      >
        <SignUp isActive={isActive} />
        <SignIn isActive={isActive} />
        <div
          className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-all duration-600 ease-in-out ${
            isActive ? 'transform -translate-x-full rounded-r-[150px]' : 'rounded-l-[150px]'
          } z-[1000]`}
        >
          <div
            className={`bg-gradient-to-r from-black to-black text-white relative left-[-100%] h-full w-[200%] transform ${
              isActive ? 'translate-x-1/2' : 'translate-x-0'
            } transition-all duration-600 ease-in-out`}
          >
            <div
              className={`absolute top-0 flex flex-col items-center justify-center w-1/2 h-full px-8 text-center transition-all duration-600 ease-in-out ${
                isActive ? 'transform translate-x-0' : 'transform -translate-x-[200%]'
              }`}
            >
              <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
              <p className="text-sm mb-8">
                Register with your personal details to use all of site features
              </p>
              <button
                onClick={toggleActive}
                className="bg-transparent border border-white text-white text-xs py-2 px-8 rounded-lg font-semibold uppercase tracking-wide mt-4 cursor-pointer"
              >
                Sign In
              </button>
            </div>
            <div
              className={`absolute top-0 right-0 flex flex-col items-center justify-center w-1/2 h-full px-8 text-center transition-all duration-600 ease-in-out ${
                isActive ? 'transform translate-x-[200%]' : 'transform translate-x-0'
              }`}
            >
              <h1 className="text-3xl font-bold mb-4">Hello, Friend!</h1>
              <p className="text-sm mb-8">
                Enter your personal details to use all of site features
              </p>
              <button
                onClick={toggleActive}
                className="bg-transparent border border-white text-white text-xs py-2 px-8 rounded-lg font-semibold uppercase tracking-wide mt-4 cursor-pointer"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}