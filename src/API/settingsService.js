import axios from 'axios';
import authService from './authService'; // Import the authService to get the userId

const API_URL = 'https://localhost:7099/api';

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };
};

const handleApiError = (error) => {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    throw new Error(message);
};

const settingsService = {
    getSettings: async () => {
        try {
            const userId = authService.getUserIdFromToken();
            if (!userId) {
                throw new Error('User is not authenticated');
            }

            const response = await axios.get(
                `${API_URL}/Auth/profile/${userId}`, // Fetch user profile using the userId
                getHeaders()
            );
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    },

    updateUserSettings: async (userSettings) => {
        try {
            const userId = authService.getUserIdFromToken();
            if (!userId) {
                throw new Error('User is not authenticated');
            }

            const response = await axios.put(
                `${API_URL}/Auth/update-settings/${userId}`, // Update user settings using the userId
                userSettings,
                getHeaders()
            );
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    }
};

export default settingsService;