import React from 'react';
import Task from './Task';
import { observer } from 'mobx-react';
import { taskStore, ITask, Status } from './models';

const TasksBoard: React.FC = observer(() => {
    const onDragStart = (id: number) => {
        taskStore.setDraggedTaskId(id);
    };
    const onDrop = (status: Status) => {
        taskStore.moveTask(status);
    };

    const groupsTasks: Record<Status, ITask[]> = {
        [Status.TODO]: [],
        [Status.InProgress]: [],
        [Status.QA]: [],
        [Status.Done]: []
    };

    taskStore.tasks.forEach(task => {
        groupsTasks[task.status].push(task);
    });

    return (
        <div className='my-auto'>
            <h2 className='text-center mb-[25px]'>My Board Tasks</h2>
            <div className='flex justify-center mx-auto my-auto border border-[#cccccc] w-[760px] h-[270px]'>
                {Object.entries(groupsTasks).map(([status, tasks]) => (
                    <div
                        key={status}
                        className='p-2 m-2 border-r flex-1'
                        onDrop={() => onDrop(status as Status)}
                        onDragOver={(e) => e.preventDefault()}
                    >
                        <h3 className='text-center mb-[10px] border-2 border-b-black'>{status}</h3>
                        {tasks.map(task => (
                            <Task key={task.id} task={task} onDragStart={onDragStart} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
});

export default TasksBoard;
