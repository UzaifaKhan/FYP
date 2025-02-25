import axios from 'axios';
import authService from './authService';

const API_URL = 'https://localhost:7099/api';

const getSettings = async () => {
    const token = authService.getCurrentUser();
    if (!token) {
        throw new Error('User is not authenticated');
    }

    const userId = authService.getUserIdFromToken();  // Fetch userId from the token
    if (!userId) {
        throw new Error('User ID not found in the token');
    }

    try {
        // Dynamically replace {userId} with actual userId
        const response = await axios.get(`${API_URL}/Auth/profile/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}` // Send token in header
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Error fetching settings: ' + error?.response?.data?.message || error.message);
    }
};

const updateUserSettings = async (userSettings) => {
    const token = authService.getCurrentUser();
    if (!token) {
        throw new Error('User is not authenticated');
    }

    const userId = authService.getUserIdFromToken(); // Ensure the user ID is fetched from token
    if (!userId) {
        throw new Error('User ID not found in the token');
    }

    try {
        await axios.put(`${API_URL}/Auth/update-settings`, userSettings, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (error) {
        throw new Error('Error saving settings: ' + error?.response?.data?.message || error.message);
    }
};

export default {
    getSettings,
    updateUserSettings
};
