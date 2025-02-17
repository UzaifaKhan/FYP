import axios from 'axios';

const API_URL = 'https://localhost:7099/api';

const authService = {
    login: async (credentials) => {
        try {
            const response = await axios.post(`${API_URL}/Auth/login`, credentials);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token); // Store the token in localStorage.
                return response.data;
            }
            return null;
        } catch (error) {
            throw new Error(error?.response?.data?.message || 'An error occurred during login');
        }
    },

    signup: async (userData) => {
        try {
            const response = await axios.post(`${API_URL}/Auth/register`, userData);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);  // Store the token in localStorage.
                return response.data;
            }
            return null;
        } catch (error) {
            throw new Error(error?.response?.data?.message || 'An error occurred during signup');
        }
    },

    forgotPassword: async (email) => {
        try {
            const response = await axios.post(`${API_URL}/auth/forget-password`, { email });
            return response.data;  // This should return a success message (like 'Password reset link sent').
        } catch (error) {
            throw new Error(error?.response?.data?.message || 'An error occurred during forgot password request');
        }
    },

    logout: () => {
        localStorage.removeItem('token');  // Clear the token from localStorage when logging out.
    },

    getCurrentUser: () => {
        return localStorage.getItem('token');  // Retrieve the token from localStorage.
    },

    // Decode the token to get user info like userId
    getUserIdFromToken: () => {
        const token = localStorage.getItem('token');
        if (!token) return null;
        try {
            const decoded = JSON.parse(atob(token.split('.')[1]));  // Decode the JWT token.
            return decoded?.userId;  // Assuming the userId is part of the token payload.
        } catch (error) {
            console.error('Failed to decode token:', error);
            return null;
        }
    }
};

export default authService;