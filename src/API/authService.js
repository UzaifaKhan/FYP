import axios from 'axios';

const API_URL =  'http://your-api-url/api';

const authService = {
    login: async (credentials) => {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, credentials)
            if(response.data.token){
                localStorage.setItem('token', response.data.token)
                return response.data
            }
            return null
        } catch (error){
            throw error.message?.data || {message: 'An error occurred during login'}
        }
    },

    signup: async (userData) => {
        try {
            const response = await axios.post(`${API_URL}/auth/signup`, userData)
            if(response.data.token){
                localStorage.setItem('token', response.data.token)
                return response.data
            }
            return null
        } catch (error){
            throw error.message?.data || {message: 'An error occurred during signup'}
        }
    },

    forgetPassword: async (email) => {
        try {
            const response = await axios.post(`${API_URL}/auth/forget-password`, {email})
            return response.data
        } catch (error){
            throw error.message?.data || {message: 'An error occurred during forget password'}
        }
    },

    logout: () => {
        localStorage.removeItem('token')
    },
    getCurrentUser: () => {
        return localStorage.getItem('token')
    }
}
export default authService;