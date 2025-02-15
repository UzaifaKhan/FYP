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

const restaurantService = {
    addRestaurant: async (restaurantData) => {
        try {
            const response = await axios.post(
                `${API_URL}/restaurants`,
                restaurantData,
                getHeaders()
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to add restaurant' };
        }
    },

    getBusinessTypes: async () => {
        try {
            const response = await axios.get(
                `${API_URL}/restaurants/business-types`,
                getHeaders()
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to fetch business types' };
        }
    },

    validateAddress: async (address) => {
        try {
            const response = await axios.post(
                `${API_URL}/restaurants/validate-address`,
                { address },
                getHeaders()
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to validate address' };
        }
    },

    submitReview: async (reviewData) => {
        try {
            const response = await axios.post(
                `${API_URL}/restaurants/reviews`,
                reviewData,
                getHeaders()
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || {message: 'Failed to submit review'}
        }
    }
};

export default restaurantService;