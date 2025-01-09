import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
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
    const [title, setTitle] = useState('');
    const [about, setAbout] = useState('');

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('taskList')) || [];
        setTasks(storedTasks);
    }, []);

    useEffect(() => {
        localStorage.setItem('taskList', JSON.stringify(tasks));
    }, [tasks]);

    function createTask(title, about) {
        const newTask = {
            id: uuidv4(),
            title,
            about,
        };
        setTasks([...tasks, newTask]);
        showNotification('Task created');
        setDeleteModalOpen(false);
    }

    function deleteTask(id) {
        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks(updatedTasks);
        showNotification('Task deleted');
        setDeleteModalOpen(false);
    }

    function updateTask(index, title, about) {

        const updatedTasks = tasks.map((task, i) => 
            i === index ? { ...task, title, about } : task
        );
        setTasks(updatedTasks);
        showNotification('Changes saved');
    }

    function copyTask(index) {
        if (index === null || index < 0 || index >= tasks.length) {
            showNotification('No task to copy.');
            return;
        }
    
        const task = tasks[index];
        const textToCopy = `Title: ${task.title}\nAbout: ${task.about}`;
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                showNotification('Copied to clipboard');
            })
            .catch(() => {
                console.error('Failed to copy: ', err);
                showNotification('Failed to copy');
            });
    }

    function openDeleteModal(index) {
        setCurrentTaskIndex(index);
        setDeleteModalOpen(true);
    }

    function openEditModal(id) {
        const index = tasks.findIndex(task => task.id === id);
        setCurrentTaskIndex(index);
        setEditModalOpen(true);
        const taskToEdit = tasks[index];
        setTitle(taskToEdit.title);
        setAbout(taskToEdit.about);
    }

    function openShareModal(id) {
        const index = tasks.findIndex(task => task.id === id);
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
            <CreateForm
                onCreate={createTask}
                showNotification={showNotification}
            />
            <DragDropContext onDragEnd={onDragEnd}>
                <TaskList 
                    tasks={tasks}
                    onDelete={openDeleteModal}
                    onEdit={openEditModal}
                    onShare={openShareModal}                
                />
            </DragDropContext>
            <Notification message={notification}/>
            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={() => deleteTask(currentTaskIndex)}
            />
            <EditModal
                isOpen={isEditModalOpen}
                onClose={() => setEditModalOpen(false)}
                onSave={(title, about) => {
                    updateTask(currentTaskIndex, title, about);
                    setEditModalOpen(false);
                }}
                title={title}
                about={about}
                showNotification={showNotification}
            />
            <ShareModal
                isOpen={isShareModalOpen}
                onClose={() => setShareModalOpen(false)}
                onCopy={() => copyTask(currentTaskIndex)}
            />
        </div>
    );
}

export default App;
