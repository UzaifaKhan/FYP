import axios from 'axios';

const API_URL = 'https://localhost:7099/api';

const authService = {
    login: async (credentials) => {
        try {
            const response = await axios.post(`${API_URL}/Auth/login`, credentials);  // Added backticks
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
            const response = await axios.post(`${API_URL}/Auth/register`, userData);  // Added backticks
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);  // Store the token in localStorage.
                return response.data;
            }
            return null;
        } catch (error) {
            throw new Error(error?.response?.data?.message || 'An error occurred during signup');
        }
    },

    ForgotPassword: async (email) => {
        try {
            const response = await axios.post(`${API_URL}/Auth/forget-password`, { email });  // Added backticks
            return response.data;  // This should return a success message (like 'Password reset link sent').
        } catch (error) {
            throw new Error(error?.response?.data?.message || 'An error occurred during forgot password request');
        }
    },

    logout: () => {
        localStorage.removeItem('token');  // Clear the token from localStorage when logging out.
    },

    getCurrentUser: () => {
        const token = localStorage.getItem('token');
        if (token && !authService.isTokenExpired(token)) {
            return token;  // Return token if it's available and not expired
        }
        return null;
    },

    // Decode the token to get user info like userId
    getUserIdFromToken: () => {
        const token = localStorage.getItem('token');
        if (!token || authService.isTokenExpired(token)) return null; // Check if token exists and is not expired

        try {
            const decoded = JSON.parse(atob(token.split('.')[1]));  // Decode the JWT token.
            if (decoded?.userId) {
                return decoded.userId;  // Return the userId if it exists in the decoded token.
            } else {
                console.error('UserId not found in the token:', decoded); // Log the decoded token for debugging
                return null;
            }
        } catch (error) {
            console.error('Failed to decode token:', error);
            return null;
        }
    },

    // Check if the token has expired
    isTokenExpired: (token) => {
        try {
            const decoded = JSON.parse(atob(token.split('.')[1]));
            const exp = decoded?.exp;
            if (exp && Date.now() / 1000 >= exp) {
                return true;  // Token is expired
            }
            return false;  // Token is still valid
        } catch (error) {
            console.error('Error decoding token to check expiration:', error);
            return true;  // Return expired if there's an issue with decoding
        }
    },

    // Check if token exists and is valid
    tokenExists: () => {
        const token = localStorage.getItem('token');
        return token && !authService.isTokenExpired(token);
    }
};

export default authService;
