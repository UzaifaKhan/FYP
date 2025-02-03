import axios from "axios";

const API_URL =  "http://your-api-url/api";

const userService = {
    getUserProfile: async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${API_URL}/user/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            throw error.message?.data || { message: "Failed to fetch user profile" };
        }
    },

    getNotifications: async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${API_URL}/user/notifications`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            throw error.message?.data || { message: "Failed to fetch notifications" };
        }
    },

    markNotificationAsRead: async (notificationId) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.put(`${API_URL}/user/notifications/${notificationId}/read`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            throw error.message?.data || { message: "Failed to mark notification as read" };
        }
    }
}

export default userService;