import React from 'react';

function Task({ task, index }) {
    function handleDelete() {
        const taskList = JSON.parse(localStorage.getItem('taskList')) || [];
        taskList.splice(index, 1);
        localStorage.setItem('taskList', JSON.stringify(taskList));
    }

    return (
        <div className="task" key={task.index}>
            <p>{task.title}</p>
            <p>{task.about}</p>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
}

export default Task;