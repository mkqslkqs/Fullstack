import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskCard from './TaskCard';

export default function TaskColumn({ title, status, tasks, onEditTask, onDeleteTask }) {
    const { setNodeRef } = useDroppable({
        id: status,
    });

    return (
        <div className="bg-purple-100 rounded-2xl p-4 flex flex-col">
            <h2 className="text-xl font-bold text-gray-700 mb-4 text-center">{title}</h2>
            
            <SortableContext id={status} items={tasks} strategy={verticalListSortingStrategy}>
                <div ref={setNodeRef} className="flex-grow min-h-[200px] rounded-lg">
                    {tasks.map((task) => (
                        <TaskCard 
                            key={task.id} 
                            task={task} 
                            onEdit={() => onEditTask(task)}
                            onDelete={() => onDeleteTask(task.id)}
                        />
                    ))}
                </div>
            </SortableContext>
        </div>
    );
}

