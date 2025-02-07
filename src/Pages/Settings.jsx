import { useEffect, useState } from 'react';
import { Save, ArrowLeft, Bell, Moon, Globe, Lock, Volume2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import settingsService from '../API/settingsService';


export default function Settings() {
    const navigate = useNavigate();
    const [settings, setSettings] = useState({
        notifications: {
            email: true,
            push: true,
            updates: true
        },
        privacy: {
            profileVisibility: 'public',
            activityStatus: true
        },
        sound: {
            enableSound: true,
            volume: 80
        }
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                setLoading(true);
                const response = await settingsService.getSettings();
                if (response) {
                    setSettings(response);
                }
            } catch (err) {
                setError('Failed to load settings. Please try again.');
                console.error('Error fetching settings:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    const handleNotificationChange = (key) => {
        setSettings(prev => ({
            ...prev,
            notifications: {
                ...prev.notifications,
                [key]: !prev.notifications[key]
            }
        }));
    };

    const handlePrivacyChange = (key, value) => {
        setSettings(prev => ({
            ...prev,
            privacy: {
                ...prev.privacy,
                [key]: value
            }
        }));
    };

    const handleSoundChange = (key, value) => {
        setSettings(prev => ({
            ...prev,
            sound: {
                ...prev.sound,
                [key]: value
            }
        }));
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            setError(null);
            setSuccessMessage('');

            // Save each section separately
            await Promise.all([
                settingsService.updateNotificationSettings(settings.notifications),
                settingsService.updatePrivacySettings(settings.privacy),
                settingsService.updateSoundSettings(settings.sound)
            ]);

            setSuccessMessage('Settings saved successfully!');
        } catch (err) {
            setError('Failed to save settings. Please try again.');
            console.error('Error saving settings:', err);
        } finally {
            setLoading(false);
        }
    }

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
                                        checked={settings.notifications.email}
                                        onChange={() => handleNotificationChange('email')}
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
                                        checked={settings.notifications.push}
                                        onChange={() => handleNotificationChange('push')}
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
                                    value={settings.privacy.profileVisibility}
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
                                        checked={settings.privacy.activityStatus}
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
                                        checked={settings.sound.enableSound}
                                        onChange={(e) => handleSoundChange('enableSound', e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                            <div className="space-y-2">
                                <span className="text-gray-700">Volume</span>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={settings.sound.volume}
                                    onChange={(e) => handleSoundChange('volume', parseInt(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
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
                        className="flex items-center gap-2 bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
                    >
                        <Save className="w-4 h-4" />
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </main>
        </div>
    );
}