import { types, Instance } from 'mobx-state-tree';

export enum Status {
    TODO = 'ToDo',
    InProgress = 'InProgress',
    QA = 'QA',
    Done = 'Done'
}

const TaskModel = types.model("Task", {
    id: types.identifierNumber,
    name: types.string,
    status: types.enumeration("Status", Object.values(Status))
});

const TaskStore = types.model("TaskStore", {
    tasks: types.array(TaskModel),
    draggedTaskId: types.maybe(types.number),
}).actions(self => ({
    setDraggedTaskId(id: number) {
        self.draggedTaskId = id;
    },
    moveTask(newStatus: Status) {
        if (self.draggedTaskId) {
            const task = self.tasks.find(task => task.id === self.draggedTaskId);
            if (task) {
                task.status = newStatus;
            }
            self.draggedTaskId = undefined;
        }
    }
}));

export type ITask = Instance<typeof TaskModel>;
export const taskStore = TaskStore.create({
    tasks: [
        { id: 1, name: 'Add screen', status: Status.Done },
        { id: 2, name: 'Add Params', status: Status.InProgress },
        { id: 3, name: 'Bug', status: Status.QA },
        { id: 4, name: 'Style', status: Status.TODO },
        { id: 5, name: 'fix elements', status: Status.TODO },
    ]
}); 