import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TaskItem from './TaskItem';

function TaskList({ tasks, onDelete, onEdit, onDragEnd }) {
    return (
        <Droppable droppableId="droppable">
            {(provided) => (
                <div
                    id="task-container"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                    {tasks.map((task, index) => (
                        <Draggable key={task.index} draggableId={task.index.toString()} index={index}>
                            {(provided) => (
                                <TaskItem
                                    task={task}
                                    onDelete={onDelete}
                                    onEdit={onEdit}
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