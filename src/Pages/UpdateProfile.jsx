import { useState } from "react";
import { ArrowLeft, Save } from 'lucide-react'
import { useNavigate } from "react-router-dom";
import userService from "../API/userService";

export default function UpdateProfile() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)

    const navigate = useNavigate()

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(formData.password !== formData.confirmPassword){
            setError('Passwords dont match')
            return
        }
        try{
            setLoading(true)
            setError(null)
            await userService.UpdateProfile({
                name: formData.name,
                email: formData.email,
                password: formData.password
            })
            setSuccess(true)
            setTimeout(() => {
                navigate('/dashboard')
            }, 2000)
        } catch(err){
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-black text-white p-4">
                <div className="container mx-auto flex items-center">
                    <button 
                        onClick={() => navigate('/dashboard')}
                        className="flex items-center gap-2 hover:bg-gray-800 p-2 rounded transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Back to Dashboard</span>
                    </button>
                    <h1 className="text-xl font-medium ml-4">Update Profile</h1>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto p-6">
                <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
                    {success ? (
                        <div className="text-green-600 text-center p-4">
                            Profile updated successfully! Redirecting...
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="bg-red-50 text-red-600 p-4 rounded">
                                    {error}
                                </div>
                            )}

                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                    Confirm New Password
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-2 bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors disabled:bg-gray-400"
                            >
                                <Save className="w-5 h-5" />
                                {loading ? 'Updating...' : 'Update Profile'}
                            </button>
                        </form>
                    )}
                </div>
            </main>
        </div>
    );
}