import React from 'react';
import ReactDOM from 'react-dom/client';
import { DragDropContext } from 'react-beautiful-dnd';
import App from './App';

const onDragEnd = (result, tasks, setTasks) => {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTasks(items);
};

ReactDOM.createRoot(document.getElementById('root')).render(
    <DragDropContext onDragEnd={(result) => onDragEnd(result, tasks, setTasks)}>
        <App />
    </DragDropContext>
);