import React from 'react';

function CreateForm({ onCreate, showNotification }) {
    let titleInput, aboutInput;

    function handleSubmit(e) {
        e.preventDefault();
        if (!titleInput.value.trim() || !aboutInput.value.trim()) {
            showNotification('Failed to create a task:\nTitle and About fields must be filled in');
            return;
        }
        onCreate(titleInput.value, aboutInput.value);
        titleInput.value = '';
        aboutInput.value = '';
    }

    return (
        <form id="task-form" className="horizontal-flex" onSubmit={handleSubmit}>
            <div className="vertical-flex">
                <input type="text" ref={input => titleInput = input} placeholder="Title..." />
                <input type="text" ref={input => aboutInput = input} placeholder="About..." />
            </div>
            <div className="individual-button">
                <button type="submit" id="create-task">
                    <img src="src\assets\icons\create.svg" alt="Create" />
                </button>
            </div>
        </form>
    );
}

export default CreateForm;