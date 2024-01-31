
import React from 'react';
import { ITask } from './models';

interface TaskProps {
    task: ITask;
    onDragStart: (id: number) => void;
}

const Task: React.FC<TaskProps> = ({ task, onDragStart }) => {
    return (
        <div
            draggable
            onDragStart={() => onDragStart(task.id)}
            className='bg-red-300 h-14 text-center mb-[7px] leading-[3.5rem]'>
            {task.name}
        </div>
    );
}

export default Task;