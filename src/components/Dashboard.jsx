import { useEffect, useState } from "react";
import { ChevronDown, Star, ThumbsUp, Bell, User, LogOut, BarChart2, MessageSquare, KeyRound, Edit, Settings } from 'lucide-react'
import {useNavigate} from 'react-router-dom'
import {useAuth} from '../App'
import userService from "../API/userService";

export default function Dashboard() {
    const [category, setCategory] = useState('')
    const [subcategory, setSubcategory] = useState('')
    const [showNotifications, setShowNotifications] = useState(false)
    const [showProfile, setShowProfile] = useState(false)
    const [notifications, setNotifications] = useState([])
    const [userProfile, setUserProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const navigate = useNavigate()
    const {logout} = useAuth()

    const subcategories = {
        'product': ['Quality', 'Features', 'Pricing'],
        'service': ['Support', 'Delivery', 'Installation'],
        'experience': ['Website', 'Mobile App', 'Store']
    }

    useEffect(() => {
        fetchUserData()
    }, [])

    const fetchUserData = async () => {
        try {
            setLoading(true)
            const [profileData, notificationsData] = await Promise.all([
                userService.getUserProfile(),
                userService.getNotifications()
            ])
            setUserProfile(profileData)
            const transformedNotifications = notificationsData.map((notification, index) => ({
                ...notification,
                ...(index === 0 && profileData && {
                    message: `Welcome to our VOC platform, ${profileData.name}!`,
                    isWelcome: true
                })
            }))
            setNotifications(transformedNotifications)
        } catch (err){
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const handleMarkNotificationAsRead = async (notificationId) => {
        try {
            await userService.markNotificationAsRead(notificationId)
            setNotifications(notifications.map(notif => 
                notif.id === notificationId
                ? {...notif, read: true}
                : notif
            ))
        } catch (err){
            console.error('Failed to mark notification as read:', err)
        }
    }

    const handleCategoryChange = (e) => {
        const newCategory = e.target.value
        setCategory(newCategory)
        setSubcategory('') 
    }

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications)
        setShowProfile(false)
    }

    const toggleProfile = () => {
        setShowProfile(!showProfile)
        setShowNotifications(false)
    }

    const handleUpdateProfile = () => {
        navigate('/profile-edit')
    }

    const handleChangePassword = () => {
        navigate('/change-password')
    }

    const handleOpenSettings = () => {
        navigate('/settings')
    }

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    return(
        <div className="min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out z-20`}>
                <div className="p-4 ">
                    <div className="bg-black px-4 py-2 rounded-lg mb-6">
                        <h2 className="text-xl font-bold text-white">Menu</h2>
                    </div>
                    <nav className="space-y-4">
                        <a href="#" className="flex items-center space-x-3 text-gray-700 hover:text-blue-500 hover:bg-blue-50 p-2 rounded-lg transition-colors">
                            <BarChart2 className="w-5 h-5" />
                            <span>Dashboard</span>
                        </a>
                        <a href="#" className="flex items-center space-x-3 text-gray-700 hover:text-blue-500 hover:bg-blue-50 p-2 rounded-lg transition-colors">
                            <BarChart2 className="w-5 h-5" />
                            <span>Analytics</span>
                        </a>
                        <a href="#" className="flex items-center space-x-3 text-gray-700 hover:text-blue-500 hover:bg-blue-50 p-2 rounded-lg transition-colors">
                            <MessageSquare className="w-5 h-5" />
                            <span>Feedback</span>
                        </a>
                    </nav>
                </div>
            </div>

            {/* Overlay */}
            {isSidebarOpen && (
                <div
                className="fixed inset-0 bg-black bg-opacity-50 z-10"
                onClick={toggleSidebar}
                ></div>
            )}
            {/* Header */}
            <header className="bg-black text-white p-4 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <button className="p-2 hover:bg-black rounded transition-colors" onClick={toggleSidebar}>
                        <div className="w-6 h-0.5 bg-white mb-1"></div>
                        <div className="w-6 h-0.5 bg-white mb-1"></div>
                        <div className="w-6 h-0.5 bg-white"></div>
                    </button>
                    <h1 className="text-xl font-medium w-full text-center">Voice Of Customer Dashboard</h1>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <button 
                            onClick={toggleNotifications}
                            className="relative hover:bg-blue-600 p-2 rounded-full transition-colors"
                        >
                            <Bell className="w-6 h-6" />
                            {notifications.some(n => !n.read) && (
                                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                            )}
                        </button>
                        {showNotifications && (
                            <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-10">
                                {loading ? (
                                    <div className="px-4 py-3 text-sm text-gray-700">Loading...</div>
                                ) : error ? (
                                    <div className="px-4 py-3 text-sm text-red-500">{error}</div>
                                ) : notifications.length === 0 ? (
                                    <div className="px-4 py-3 text-sm text-gray-700">No notifications</div>
                                ) : (
                                    <div className="max-h-96 overflow-y-auto">
                                        {notifications.map((notification) => (
                                            <div
                                            key={notification.id}
                                            className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${notification.isWelcome ? 'bg-blue-50 font-semibold' : ''} ${!notification.read ? 'bg-blue-50' : ''}}`}
                                            onClick={() => !notification.isWelcome && handleMarkNotificationAsRead(notification.id)}
                                            >
                                                <div className="text-sm text-gray-800">{notification.message}</div>
                                                    {!notification.isWelcome && (
                                                        <div className="text-xs text-gray-500 mt-1">
                                                            {new Date(notification.createdAt).toLocaleDateString()}
                                                        </div>
                                                    )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                                
                            </div>
                        )}
                    </div>
                    <div className="relative">
                        <button 
                            onClick={toggleProfile}
                            className="relative hover:bg-blue-600 p-2 rounded-full transition-colors"
                        >
                            <User className="w-6 h-6" />
                        </button>
                        {showProfile && (
                            <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-10">
                                {loading ? (
                                    <div className="px-4 py-3 text-sm text-gray-700">Loading...</div>
                                ) : error ? (
                                    <div className="px-4 py-3 text-sm text-red-500">{error}</div>
                                ) : userProfile && (
                                    <div className="px-4 py-3">
                                         <div className="font-medium text-gray-800">{userProfile.name}</div>
                                        <div className="text-sm text-gray-600">{userProfile.email}</div>
                                        <div className="text-xs text-gray-500 mt-2">
                                            Member since: {new Date(userProfile.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                )}
                                <div className="py-1">
                                    <button
                                    onClick={handleUpdateProfile}
                                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                    >
                                        <Edit className="h-4 w-4 mr-3" />
                                        Update Profile
                                    </button>
                                    <button
                                    onClick={handleChangePassword}
                                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                    >
                                        <Settings className="w-4 h-4 mr-3" />
                                        Settings
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    <button onClick={handleLogout} className="text-white flex items-center gap-2">
                        <LogOut className="w-6 h-6" />
                        <span>Logout</span>
                    </button>
                </div>
            </header>
            {/* Main Content */}
            <main className="p-6">
                {/* Filters */}
                <div className="bg-white p-4 rounded-lg shadow mb-6">
                    <div className="flex items-center gap-2 mb-4">
                        <h2 className="font-medium">Filters</h2>
                    </div>
                    <div className="flex gap-4">
                        <div className="relative w-48">
                            <select
                                value={category}
                                onChange={handleCategoryChange}
                                className="w-full p-2 border rounded appearance-none pr-8"
                            >
                                <option value="">Category</option>
                                <option value="product">Product</option>
                                <option value="service">Service</option>
                                <option value="experience">Experience</option>
                            </select>
                            <ChevronDown className="w-4 h-4 absolute right-2 top-3 text-gray-500" />
                        </div>
                        <div className="relative w-48">
                            <select
                                value={subcategory}
                                onChange={(e) => setSubcategory(e.target.value)}
                                className="w-full p-2 border rounded appearance-none pr-8"
                                disabled={!category}
                            >
                                <option value="">Subcategory</option>
                                {category && subcategories[category].map((sub) => (
                                    <option key={sub} value={sub.toLowerCase()}>
                                        {sub}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="w-4 h-4 absolute right-2 top-3 text-gray-500" />
                        </div>
                    </div>
                </div>
                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* VOC Summary Card */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-lg font-medium mb-4">VOC Summary</h2>
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-blue-100 rounded">
                                    <Bell className="w-6 h-6 text-blue-500" />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600">Total Feedback</div>
                                    <div className="text-xl font-medium">1000</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-orange-100 rounded">
                                    <Star className="w-6 h-6 text-orange-500" />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600">Average Rating</div>
                                    <div className="text-xl font-medium">4.2</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-green-100 rounded">
                                    <ThumbsUp className="w-6 h-6 text-green-500" />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600">Positive Feedback</div>
                                    <div className="text-xl font-medium">75%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Feedback Categories Card */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-lg font-medium mb-4">Feedback Categories</h2>
                    </div>
                    {/* Recent Feedback Card */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-lg font-medium mb-4">Recent Feedback</h2>
                        <div className="space-y-4">
                            <div className="border-b pb-4">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="text-sm">Great Product, highly recommended</div>
                                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">Positive</span>
                                </div>
                            </div>
                            <div className="border-b pb-4">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="text-sm">Customer Service needs improvement</div>
                                    <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded">Negative</span>
                                </div>
                            </div>
                            <div className="pb-4">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="text-sm">Average experience</div>
                                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">neutral</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}