import React, { useState } from 'react';
import apiClient from '../api/apiService.js';

export default function RegisterPage({ setRoute }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!username || !email || !password || !confirmPassword) {
            setError('Please fill out all fields.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        setError('');

        try {
            const payload = {
                username,
                email,
                hashedPassword: password,
                availabilityStatus: 'AVAILABLE',
            };

            await apiClient.post('/auth/register', payload);
            setRoute('/login');
        } catch (err) {
            setError('Registration failed. The username or email might already be taken.');
            console.error(err);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-purple-50">
            <div className="w-full max-w-md p-10 space-y-6 bg-white rounded-3xl shadow-2xl">
                <h1 className="text-4xl font-bold text-center text-gray-800">Create an Account</h1>
                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label htmlFor="register-username" className="block mb-2 text-sm font-medium text-gray-600">
                            Username
                        </label>
                        <input
                            id="register-username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-3 text-gray-800 bg-purple-50 border border-purple-200 rounded-xl focus:ring-pink-500 focus:border-pink-500"
                            placeholder="Enter your username"
                        />
                    </div>

                    <div>
                        <label htmlFor="register-email" className="block mb-2 text-sm font-medium text-gray-600">
                            Email Address
                        </label>
                        <input
                            id="register-email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 text-gray-800 bg-purple-50 border border-purple-200 rounded-xl focus:ring-pink-500 focus:border-pink-500"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="register-password" className="block mb-2 text-sm font-medium text-gray-600">
                            Password
                        </label>
                        <input
                            id="register-password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 text-gray-800 bg-purple-50 border border-purple-200 rounded-xl focus:ring-pink-500 focus:border-pink-500"
                            placeholder="Enter your password"
                        />
                    </div>

                    <div>
                        <label htmlFor="register-confirm-password" className="block mb-2 text-sm font-medium text-gray-600">
                            Confirm Password
                        </label>
                        <input
                            id="register-confirm-password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-3 text-gray-800 bg-purple-50 border border-purple-200 rounded-xl focus:ring-pink-500 focus:border-pink-500"
                            placeholder="Re-enter your password"
                        />
                    </div>

                    {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                    <button
                        type="submit"
                        className="w-full px-4 py-3 font-semibold text-white bg-pink-500 rounded-xl hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 transition-all transform hover:scale-105"
                    >
                        Register
                    </button>
                </form>

                <p className="text-sm text-center text-gray-500">
                    Already have an account?{' '}
                    <button
                        onClick={() => setRoute('/login')}
                        className="font-medium text-pink-500 hover:underline"
                    >
                        Log in here
                    </button>
                </p>
            </div>
        </div>
    );
}
