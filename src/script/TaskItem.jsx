import React from 'react';

function TaskItem({ task, onDelete, onEdit, provided }) {
    return (
        <div
            className="task"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            id={task.index}
        >
            <div className="whole-task">
                <div className="individual-task">
                    <div className="vertical-flex">
                        <p className="title-container">{task.title}</p>
                        <p className="about-container">{task.about}</p>
                    </div>
                    <div className="individual-button">
                        <button className="task-buttons delete-button" onClick={() => onDelete(task.index)}>
                            <img src="src/assets/icons/delete.svg" alt="Delete" />
                        </button>
                    </div>
                </div>
                <div className="button-container task-buttons" style={{ display: 'none' }}>
                    <button className="task-buttons share-button"><img src="src/assets/icons/share.svg" alt="Share" /></button>
                    <button className="task-buttons info-button"><img src="src/assets/icons/info.svg" alt="Info" /></button>
                    <button className="task-buttons edit-button" onClick={() => onEdit(task.index)}><img src="src/assets/icons/edit.svg" alt="Edit" /></button>
                </div>
            </div>
        </div>
    );
}

export default TaskItem;