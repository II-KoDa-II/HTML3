import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import TaskItem from './TaskItem';

function TaskList({ tasks, onDelete, onEdit, onShare }) {
    return (
        <Droppable droppableId="taskList">
            {(provided) => (
                <div id="task-container" ref={provided.innerRef} {...provided.droppableProps}>
                    {tasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(provided) => (
                                <TaskItem 
                                    task={task} 
                                    onDelete={onDelete} 
                                    onEdit={onEdit} 
                                    onShare={onShare} 
                                    provided={provided}
                                />
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
}

export default TaskList;
