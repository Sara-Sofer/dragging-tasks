import React from 'react';
import { taskStore } from './models';
import './App.css';
import TasksBoard from './TasksBoard';
import { Provider } from 'mobx-react';

function App() {
  return (
    <Provider taskStore={taskStore}>
    <TasksBoard />
  </Provider>
  );
}

export default App;
