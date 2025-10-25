import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const TaskCard = React.memo(({ task, onEditTask, onDeleteTask }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const priorityColors = {
        CRITICAL: 'bg-red-300 border-red-400',
        HIGH: 'bg-orange-300 border-orange-400',
        MEDIUM: 'bg-yellow-300 border-yellow-400',
        LOW: 'bg-green-300 border-green-400',
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`p-5 rounded-2xl shadow-lg text-gray-800 border-b-8 touch-none ${
                priorityColors[task.priorityLevel] || 'bg-gray-300 border-gray-400'
            }`}
        >
            <div className="flex justify-between items-start">
                <h3 className="font-bold text-xl mb-2 break-words">{task.title}</h3>
                <div className="flex-shrink-0 flex items-center space-x-1">
                    <button
                        onClick={() => onEditTask(task)}
                        className="p-1 text-gray-600 hover:text-blue-500 transition-colors"
                        aria-label="Edit task"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => onDeleteTask(task.id)}
                        className="p-1 text-gray-600 hover:text-red-500 transition-colors"
                        aria-label="Delete task"
                    >
                        Delete
                    </button>
                </div>
            </div>

            {task.description && (
                <p className="text-sm text-gray-600 mb-4 break-words">{task.description}</p>
            )}

            <div className="text-xs flex justify-between items-center">
                <span className="font-semibold bg-white bg-opacity-50 px-3 py-1 rounded-full">
                    {task.priorityLevel}
                </span>
                <span className="text-gray-700 font-medium">
                    For: {task.assignedUsername || 'Unassigned'}
                </span>
            </div>
        </div>
    );
});

export default TaskCard;
