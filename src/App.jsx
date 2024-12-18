import React, { useState, useEffect } from 'react';
import TaskForm from './script/TaskForm';
import TaskList from './script/TaskList';
import Notification from './script/Notification';
import { DragDropContext } from 'react-beautiful-dnd';
import './styles/main.css';
import './styles/modals.css'

function App() {
    const [tasks, setTasks] = useState([]);
    const [notification, setNotification] = useState('');

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('taskList')) || [];
        setTasks(storedTasks);
    }, []);

    useEffect(() => {
        localStorage.setItem('taskList', JSON.stringify(tasks));
    }, [tasks]);

    function createTask(title, about) {
        const newTask = { title, about, index: tasks.length };
        setTasks([...tasks, newTask]);
        showNotification('Created new task');
    }

    function deleteTask(index) {
        setTasks(tasks.filter(task => task.index !== index));
        showNotification('Deleted a task');
    }

    function editTask(index) {
    }

    function onDragEnd(result) {
        if (!result.destination) return;
        const reorderedTasks = Array.from(tasks);
        const [removed] = reorderedTasks.splice(result.source.index, 1);
        reorderedTasks.splice(result.destination.index, 0, removed);
        setTasks(reorderedTasks);
    }

    function showNotification(message) {
        setNotification(message);
        setTimeout(() => setNotification(''), 3000);
    }

    return (
        <div>
            <TaskForm onCreate={createTask} />
            <DragDropContext onDragEnd={onDragEnd}>
                <TaskList tasks={tasks} onDelete={deleteTask} onEdit={editTask} />
            </DragDropContext>
            <Notification message={notification} />
        </div>
    );
}

export default App;