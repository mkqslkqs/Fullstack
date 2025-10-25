import React, { useState, useEffect } from 'react';

export default function Task({ onClose, onFormSubmit, users, taskToEdit }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priorityLevel, setPriorityLevel] = useState('MEDIUM');
    const [assignedUserId, setAssignedUserId] = useState('');
    const [status, setStatus] = useState('TO_DO');

    useEffect(() => {
        if (taskToEdit) {
            setTitle(taskToEdit.title || '');
            setDescription(taskToEdit.description || '');
            setPriorityLevel(taskToEdit.priorityLevel || 'MEDIUM');
            setAssignedUserId(taskToEdit.assignedUser?.id || '');
            setStatus(taskToEdit.status || 'TO_DO');
        }
    }, [taskToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) {
            alert('Please enter a title for the task.');
            return;
        }

        const taskData = {
            title: title.trim(),
            description: description.trim(),
            priorityLevel,
            assignedUserId: assignedUserId ? parseInt(assignedUserId, 10) : null,
            status,
        };

        onFormSubmit(taskData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-bold text-gray-800">
                        {taskToEdit ? 'Edit Task' : 'Create a New Task'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-3xl font-bold"
                    >
                        &times;
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-600">
                            Task Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-2 text-gray-800 bg-purple-50 border border-purple-200 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-600">
                            Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-4 py-2 text-gray-800 bg-purple-50 border border-purple-200 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-600">
                                Priority
                            </label>
                            <select
                                value={priorityLevel}
                                onChange={(e) => setPriorityLevel(e.target.value)}
                                className="w-full px-4 py-2 text-gray-800 bg-purple-50 border border-purple-200 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                            >
                                <option value="LOW">Low</option>
                                <option value="MEDIUM">Medium</option>
                                <option value="HIGH">High</option>
                                <option value="CRITICAL">Critical</option>
                            </select>
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-600">
                                Assign To
                            </label>
                            <select
                                value={assignedUserId}
                                onChange={(e) => setAssignedUserId(e.target.value)}
                                className="w-full px-4 py-2 text-gray-800 bg-purple-50 border border-purple-200 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                            >
                                <option value="">Unassigned</option>
                                {Array.isArray(users) && users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.username}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {taskToEdit && (
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-600">
                                Status
                            </label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full px-4 py-2 text-gray-800 bg-purple-50 border border-purple-200 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                            >
                                <option value="TO_DO">To Do</option>
                                <option value="IN_PROGRESS">In Progress</option>
                                <option value="DONE">Done</option>
                            </select>
                        </div>
                    )}

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full px-4 py-3 font-semibold text-white bg-pink-500 rounded-xl hover:bg-pink-600 transition-all transform hover:scale-105"
                        >
                            {taskToEdit ? 'Save Changes' : 'Create Task'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
