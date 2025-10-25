import React, { useState, useEffect, useCallback } from 'react';
import { DndContext, PointerSensor, useSensor, useSensors, closestCenter } from '@dnd-kit/core';
import TaskColumn from './TaskColumn';
import Task from './Task';
import apiClient, { getTasks, createTask, updateTask, deleteTask } from '../api/apiService';

export default function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
    );

    /** Загружаем задачи и пользователей */
    const fetchData = useCallback(async (initial = false) => {
        try {
            if (initial) setIsLoading(true);

            const [tasksRes, usersRes] = await Promise.all([
                getTasks(),
                apiClient.get('/users')
            ]);

            const newTasks = tasksRes.data;
            const newUsers = usersRes.data;

            if (JSON.stringify(newTasks) !== JSON.stringify(tasks)) {
                console.log("Task data updated.");
                setTasks(newTasks);
            }

            if (JSON.stringify(newUsers) !== JSON.stringify(users)) {
                console.log("User data updated.");
                setUsers(newUsers);
            }

            setError('');
        } catch (err) {
            console.error(err);
            setError('⚠️ Failed to fetch data. Please check your backend connection.');
        } finally {
            if (initial) setIsLoading(false);
        }
    }, [tasks, users]);

    /** Первичная загрузка */
    useEffect(() => {
        fetchData(true);
    }, [fetchData]);

    /** Автообновление каждые 5 секунд */
    useEffect(() => {
        const id = setInterval(() => {
            console.log("Polling for updates...");
            fetchData();
        }, 5000);
        return () => clearInterval(id);
    }, [fetchData]);

    /** Перетаскивание задач */
    const handleDragEnd = ({ active, over }) => {
        if (!over) return;

        const task = tasks.find(t => t.id === active.id);
        if (!task || task.status === over.id) return;

        const previous = tasks;
        setTasks(prev =>
            prev.map(t => (t.id === active.id ? { ...t, status: over.id } : t))
        );

        updateTask(task.id, { ...task, status: over.id }).catch(err => {
            console.error("Update failed:", err);
            setTasks(previous);
            setError("Could not update task status. Please try again.");
        });
    };

    /** Открытие/закрытие модалки */
    const openModal = (task = null) => {
        setEditingTask(task);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingTask(null);
    };

    /** Создание/обновление задачи */
    const handleFormSubmit = async (taskData) => {
        try {
            const apiCall = editingTask
                ? updateTask(editingTask.id, taskData)
                : createTask(taskData);

            const { data } = await apiCall;

            setTasks(prev =>
                editingTask
                    ? prev.map(t => (t.id === editingTask.id ? data : t))
                    : [...prev, data]
            );

            closeModal();
        } catch (err) {
            console.error("Failed to save task:", err);
            setError("Failed to save the task. Please try again.");
        }
    };

    /** Удаление задачи */
    const handleDeleteTask = async (id) => {
        if (!window.confirm('Are you sure you want to delete this magical task?')) return;

        try {
            await deleteTask(id);
            setTasks(prev => prev.filter(t => t.id !== id));
        } catch (err) {
            console.error("Delete failed:", err);
            setError('Failed to delete the task. Please try again.');
        }
    };

    /** Категоризация задач */
    const todoTasks = tasks.filter(t => ['TO_DO', 'PLANNING'].includes(t.status));
    const inProgressTasks = tasks.filter(t => t.status === 'IN_PROGRESS');
    const doneTasks = tasks.filter(t => t.status === 'DONE');

    if (isLoading) {
        return <div className="p-8 text-center text-lg">Loading your tasks... ✨</div>;
    }

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <div className="p-8">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800">Your Magical Task Board 🦄</h1>
                    <button
                        onClick={() => openModal()}
                        className="px-6 py-3 font-semibold text-white bg-pink-500 rounded-xl hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 transition-all transform hover:scale-105"
                    >
                        + Create Task
                    </button>
                </header>

                {error && (
                    <p className="text-center text-red-500 bg-red-100 p-3 rounded-lg mb-4">
                        {error}
                    </p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <TaskColumn
                        title="To Do 📝"
                        status="TO_DO"
                        tasks={todoTasks}
                        onEditTask={openModal}
                        onDeleteTask={handleDeleteTask}
                    />
                    <TaskColumn
                        title="In Progress 🚀"
                        status="IN_PROGRESS"
                        tasks={inProgressTasks}
                        onEditTask={openModal}
                        onDeleteTask={handleDeleteTask}
                    />
                    <TaskColumn
                        title="Done 🎉"
                        status="DONE"
                        tasks={doneTasks}
                        onEditTask={openModal}
                        onDeleteTask={handleDeleteTask}
                    />
                </div>

                {isModalOpen && (
                    <Task
                        onClose={closeModal}
                        onFormSubmit={handleFormSubmit}
                        users={users}
                        taskToEdit={editingTask}
                    />
                )}
            </div>
        </DndContext>
    );
}
