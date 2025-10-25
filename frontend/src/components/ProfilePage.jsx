import React, { useState, useEffect } from 'react';
import apiClient from '../api/apiService';


export default function ProfilePage() {

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');


    const [selectedEmoji, setSelectedEmoji] = useState(() => localStorage.getItem('userEmoji') || '🌸');


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setIsLoading(true);

                const response = await apiClient.get('/auth/profile');
                if (response.data) {
                    setUser(response.data);
                } else {
                    setError('No user data found.');
                }
            } catch (err) {
                console.error('Failed to fetch user data:', err);
                setError('Could not load your profile. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, []);


    useEffect(() => {
        localStorage.setItem('userEmoji', selectedEmoji);
    }, [selectedEmoji]);

    const statusStyles = {
        AVAILABLE: 'bg-green-200 text-green-800',
        BUSY: 'bg-red-200 text-red-800',
    };

    const emojis = ['🌸', '🦄', '✨', '🚀', '💖', '😎'];

    if (isLoading) {
        return <div className="p-8 text-center text-lg">Loading your magical profile... ✨</div>;
    }

    if (error) {
        return <div className="p-8 text-center text-red-500 bg-red-100 p-4 rounded-lg">{error}</div>;
    }

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-68px)] bg-purple-50">
            <div className="w-full max-w-lg p-10 space-y-6 bg-white rounded-3xl shadow-2xl text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Your Awesome Profile {selectedEmoji}</h1>
                <div className="space-y-4 text-left pt-4">
                    {}
                    <div className="p-4 bg-purple-100 rounded-xl">
                        <label className="block text-sm font-medium text-gray-500 mb-2">Choose your vibe:</label>
                        <div className="flex justify-center space-x-2">
                            {emojis.map((emoji) => (
                                <button
                                    key={emoji}
                                    onClick={() => setSelectedEmoji(emoji)}
                                    className={`p-2 text-2xl rounded-full transition-transform transform hover:scale-125 ${selectedEmoji === emoji ? 'bg-pink-200' : 'bg-transparent'}`}
                                >
                                    {emoji}
                                </button>
                            ))}
                        </div>
                    </div>

                    {}
                    {user && (
                         <>
                            <div className="p-4 bg-purple-100 rounded-xl">
                                <label className="block text-sm font-medium text-gray-500">Username</label>
                                <p className="text-lg text-gray-800 font-semibold">{user.username}</p>
                            </div>
                            <div className="p-4 bg-purple-100 rounded-xl">
                                <label className="block text-sm font-medium text-gray-500">Email Address</label>
                                <p className="text-lg text-gray-800 font-semibold">{user.email}</p>
                            </div>
                            <div className="p-4 bg-purple-100 rounded-xl">
                                <label className="block text-sm font-medium text-gray-500">Current Status</label>
                                <p className={`inline-block px-4 py-1 mt-1 text-lg font-semibold rounded-full ${statusStyles[user.availabilityStatus]}`}>
                                    {user.availabilityStatus}
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

