import React, { useState, useEffect } from 'react';
import CreateForm from './script/CreateForm';
import TaskList from './script/TaskList';
import Notification from './script/Notification';
import DeleteModal from './script/DeleteModal';
import EditModal from './script/EditModal';
import ShareModal from './script/ShareModal';
import { DragDropContext } from 'react-beautiful-dnd';
import './styles/main.css';
import './styles/modals.css';

function App() {
    const [tasks, setTasks] = useState([]);
    const [notification, setNotification] = useState('');
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isShareModalOpen, setShareModalOpen] = useState(false);
    const [currentTaskIndex, setCurrentTaskIndex] = useState(null);

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
        setDeleteModalOpen(false);
    }

    function openDeleteModal(index) {
        setCurrentTaskIndex(index);
        setDeleteModalOpen(true);
    }

    function openEditModal(index) {
        setCurrentTaskIndex(index);
        setEditModalOpen(true);
    }

    function openShareModal(index) {
        setCurrentTaskIndex(index);
        setShareModalOpen(true);
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
            <CreateForm onCreate={createTask} />
            <DragDropContext onDragEnd={onDragEnd}>
                <TaskList tasks={tasks} onDelete={openDeleteModal} onEdit={openEditModal} onShare={openShareModal}/>
            </DragDropContext>
            <Notification message={notification} />
            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={() => deleteTask(currentTaskIndex)}
            />
            <EditModal
                isOpen={isEditModalOpen}
                onClose={() => setEditModalOpen(false)}
            />
            <ShareModal
                isOpen={isShareModalOpen}
                onClose={() => setShareModalOpen(false)}
            />
        </div>
    );
}

export default App;
