import React, { useState } from 'react';

function TaskItem({ task, onDelete, onEdit, onShare, provided }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="task"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            id={task.id}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="whole-task">
                <div className="individual-task">
                    <div className="vertical-flex">
                        <p className="title-container">{task.title}</p>
                        <p className="about-container">{task.about}</p>
                    </div>
                    <div className="individual-button">
                        <button className="task-buttons delete-button" onClick={() => onDelete(task.id)}>
                            <img src="src/assets/icons/delete.svg" alt="Delete" />
                        </button>
                    </div>
                </div>
                <div className="button-container task-buttons" style={{ display: isHovered ? 'flex' : 'none' }}>
                    <button className="task-buttons share-button" onClick={() => onShare(task.id)}><img src="src/assets/icons/share.svg" /></button>
                    <button className="task-buttons info-button"><img src="src/assets/icons/info.svg" /></button>
                    <button className="task-buttons edit-button" onClick={() => onEdit(task.id)}><img src="src/assets/icons/edit.svg" /></button>
                </div>
            </div>
        </div>
    );
}

export default TaskItem;