import React, { useState } from 'react';
import apiClient from '../api/apiService.js';

export default function LoginPage({ setRoute }) {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { username, password } = formData;

        if (!username || !password) {
            setError('Please enter both your username and password!');
            return;
        }

        try {
            setError('');
            const { data } = await apiClient.post('/auth/login', { username, password });
            localStorage.setItem('jwtToken', data.jwt);
            setRoute('/dashboard');
        } catch (err) {
            console.error(err);
            setError('Login failed! Please check your credentials.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-purple-50">
            <div className="w-full max-w-md p-10 space-y-6 bg-white rounded-3xl shadow-2xl">
                <h1 className="text-4xl font-bold text-center text-gray-800">
                    Welcome Back
                </h1>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label
                            htmlFor="username"
                            className="block mb-2 text-sm font-medium text-gray-600"
                        >
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full px-4 py-3 text-gray-800 bg-purple-50 border border-purple-200 rounded-xl focus:ring-pink-500 focus:border-pink-500"
                            placeholder="e.g., alice"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-600"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-3 text-gray-800 bg-purple-50 border border-purple-200 rounded-xl focus:ring-pink-500 focus:border-pink-500"
                            placeholder="Your secret password"
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-red-500 text-center">{error}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full px-4 py-3 font-semibold text-white bg-pink-500 rounded-xl hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 transition-all transform hover:scale-105"
                    >
                        Log In
                    </button>
                </form>

                <p className="text-sm text-center text-gray-500">
                    Don’t have an account yet?{' '}
                    <button
                        onClick={() => setRoute('/register')}
                        className="font-medium text-pink-500 hover:underline"
                    >
                        Sign up here
                    </button>
                </p>
            </div>
        </div>
    );
}
