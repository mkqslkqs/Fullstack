import React from 'react';

export default function Navigatorr({ setRoute }) {
    return (
         <nav className="bg-white p-4 shadow-md flex justify-between items-center">
            <div className="text-gray-800 text-2xl font-bold">Task is Magic 🪄</div>
            <div>
                 <button onClick={() => setRoute('/dashboard')} className="text-gray-600 hover:text-pink-500 px-4 py-2 rounded-xl text-sm font-medium transition-colors">Dashboard</button>
                 <button onClick={() => setRoute('/profile')} className="text-gray-600 hover:text-pink-500 px-4 py-2 rounded-xl text-sm font-medium transition-colors">Profile</button>
                 <button onClick={() => setRoute('/login')} className="bg-purple-100 text-purple-700 hover:bg-purple-200 px-4 py-2 rounded-xl text-sm font-medium transition-colors">Logout</button>
            </div>
        </nav>
    );
};
