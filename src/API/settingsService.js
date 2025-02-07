import axios from 'axios';

const API_URL = 'http://your-api-url/api';

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };
};

const handleApiError = (error) => {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    throw new Error(message);
};

const settingsService = {
    getSettings: async () => {
        try {
            const response = await axios.get(
                `${API_URL}/user/settings`,
                getHeaders()
            );
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    },

    updateNotificationSettings: async (notificationSettings) => {
        try {
            const response = await axios.put(
                `${API_URL}/user/settings/notifications`,
                notificationSettings,
                getHeaders()
            );
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    },

    updatePrivacySettings: async (privacySettings) => {
        try {
            const response = await axios.put(
                `${API_URL}/user/settings/privacy`,
                privacySettings,
                getHeaders()
            );
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    },

    updateSoundSettings: async (soundSettings) => {
        try {
            const response = await axios.put(
                `${API_URL}/user/settings/sound`,
                soundSettings,
                getHeaders()
            );
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    }
};

export default settingsService;