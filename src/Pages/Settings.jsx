import { useEffect, useState } from 'react';
import { Save, ArrowLeft, Bell, Lock, Volume2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import settingsService from '../API/settingsService';
import authService from '../API/authService'; // Import authService to check if the user is logged in

export default function Settings() {
    const navigate = useNavigate();
    const [settings, setSettings] = useState({
        userId: null, // Add userId to the state
        emailNotifications: false,
        pushNotifications: false,
        updates: false,
        profileVisibility: 'public',
        activityStatus: false,
        enableSound: false,
        volume: 50
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    // Fetch user settings
    const fetchSettings = async () => {
        const token = authService.getCurrentUser();
        if (!token) {
            navigate('/login'); // Redirect to login if the user is not authenticated
            return;
        }

        try {
            setLoading(true);
            const response = await settingsService.getSettings();
            if (response) {
                setSettings({
                    userId: response.userId || null,
                    emailNotifications: response.emailNotifications || false,
                    pushNotifications: response.pushNotifications || false,
                    updates: response.updates || false,
                    profileVisibility: response.profileVisibility || 'public',
                    activityStatus: response.activityStatus || false,
                    enableSound: response.enableSound || false,
                    volume: response.volume || 50
                });
            }
        } catch (err) {
            if (err.message === 'User is not authenticated') {
                navigate('/login');
            } else {
                setError('Failed to load settings. Please try again.');
            }
            console.error('Error fetching settings:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSettings();
    }, [navigate]); // Only rerun effect if navigate changes

    const handleNotificationChange = (key) => {
        setSettings((prev) => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const handlePrivacyChange = (key, value) => {
        setSettings((prev) => ({
            ...prev,
            [key]: value
        }));
    };

    const handleSoundChange = (key, value) => {
        setSettings((prev) => ({
            ...prev,
            [key]: value
        }));
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            setError(null);
            setSuccessMessage('');

            // Check if UserId is available before proceeding
            if (!settings.userId) {
                setError('UserId is required.');
                return;
            }

            // Construct the settings payload
            const userSettings = {
                UserId: settings.userId,
                EmailNotifications: settings.emailNotifications,
                PushNotifications: settings.pushNotifications,
                Updates: settings.updates,
                ProfileVisibility: settings.profileVisibility,
                ActivityStatus: settings.activityStatus,
                EnableSound: settings.enableSound,
                Volume: settings.volume
            };

            // Log the payload for debugging
            console.log('User Settings Payload:', userSettings);

            // Send the settings to the backend for update
            await settingsService.updateUserSettings(userSettings);

            setSuccessMessage('Settings saved successfully!');
        } catch (err) {
            // Handle backend error
            setError(err?.response?.data?.message || 'Failed to save settings. Please try again.');
            console.error('Error saving settings:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-black text-white p-4">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => navigate('/dashboard')}
                        className="hover:bg-gray-800 p-2 rounded transition-colors"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <h1 className="text-xl font-medium">Settings</h1>
                </div>
            </header>

            {/* Main Content */}
            <main className="p-6 max-w-4xl mx-auto">
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                {/* Notifications Settings */}
                <div className="bg-white rounded-lg shadow mb-6">
                    <div className="p-6 border-b">
                        <div className="flex items-center gap-3 mb-4">
                            <Bell className="w-5 h-5 text-gray-600" />
                            <h2 className="text-lg font-medium">Notifications</h2>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-700">Email Notifications</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={settings.emailNotifications || false}
                                        onChange={() => handleNotificationChange('emailNotifications')}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-700">Push Notifications</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={settings.pushNotifications || false}
                                        onChange={() => handleNotificationChange('pushNotifications')}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Privacy Settings */}
                <div className="bg-white rounded-lg shadow mb-6">
                    <div className="p-6 border-b">
                        <div className="flex items-center gap-3 mb-4">
                            <Lock className="w-5 h-5 text-gray-600" />
                            <h2 className="text-lg font-medium">Privacy</h2>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-700">Profile Visibility</span>
                                <select
                                    value={settings.profileVisibility || 'public'}
                                    onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                                    className="border rounded-md px-3 py-2"
                                >
                                    <option value="public">Public</option>
                                    <option value="private">Private</option>
                                    <option value="contacts">Contacts Only</option>
                                </select>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-700">Activity Status</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={settings.activityStatus || false}
                                        onChange={(e) => handlePrivacyChange('activityStatus', e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sound Settings */}
                <div className="bg-white rounded-lg shadow mb-6">
                    <div className="p-6 border-b">
                        <div className="flex items-center gap-3 mb-4">
                            <Volume2 className="w-5 h-5 text-gray-600" />
                            <h2 className="text-lg font-medium">Sound</h2>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-700">Enable Sound</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={settings.enableSound || false}
                                        onChange={() => handleSoundChange('enableSound', !settings.enableSound)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-700">Volume</span>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={settings.volume || 50}
                                    onChange={(e) => handleSoundChange('volume', parseInt(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-md"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-500 disabled:opacity-50"
                    >
                        {loading ? 'Saving...' : 'Save'}
                    </button>
                </div>

                {successMessage && (
                    <div className="bg-green-100 text-green-700 px-4 py-3 rounded mt-4">
                        {successMessage}
                    </div>
                )}
            </main>
        </div>
    );
}
