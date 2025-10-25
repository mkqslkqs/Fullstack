import React, { useState, useEffect } from 'react';
import { getPublicTask } from '../api/apiService';


export default function SharedTaskPage() {
    const [task, setTask] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTask = async () => {
            try {
                
                const pathParts = window.location.pathname.split('/');
                const taskId = pathParts[pathParts.length - 1];

                if (!taskId || isNaN(taskId)) {
                    setError('This does not seem to be a valid task link.');
                    setIsLoading(false);
                    return;
                }

                const response = await getPublicTask(taskId);
                setTask(response.data);
            } catch (err) {
                console.error("Failed to fetch shared task:", err);
                setError('Could not load this task. It might have been deleted or the link is incorrect.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchTask();
    }, []);

    if (isLoading) {
        return <div className="text-center p-10">Loading task details... ✨</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 p-10 bg-red-100 m-8 rounded-xl">{error}</div>;
    }

    if (!task) {
        return <div className="text-center p-10">No task found.</div>;
    }

    const priorityColors = {
        CRITICAL: 'bg-red-300 border-red-400',
        HIGH: 'bg-orange-300 border-orange-400',
        MEDIUM: 'bg-yellow-300 border-yellow-400',
        LOW: 'bg-green-300 border-green-400',
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-purple-50">
            <div className="w-full max-w-2xl p-10 space-y-6 bg-white rounded-3xl shadow-2xl">
                 <h1 className="text-3xl font-bold text-center text-gray-800">Task Details</h1>
                 <div className={`p-6 rounded-2xl shadow-inner text-gray-800 border-b-8 ${priorityColors[task.priorityLevel] || 'bg-gray-300 border-gray-400'}`}>
                    <h2 className="font-bold text-2xl mb-2">{task.title}</h2>
                    <p className="text-gray-600 mb-4">{task.description}</p>
                    <div className="flex justify-between items-center text-sm">
                        <span className="font-semibold bg-white bg-opacity-70 px-3 py-1 rounded-full">{task.priorityLevel} Priority</span>
                        <span className="text-gray-700 font-medium">Assigned to: {task.assignedUsername || 'Unassigned'}</span>
                    </div>
                 </div>
                 <p className="text-xs text-center text-gray-400 pt-4">This is a shared task link. To see more, please log in or register.</p>
            </div>
        </div>
    );
};

