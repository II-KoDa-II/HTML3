import React, { useState } from 'react';

function EditModal({ isOpen, onClose }) {
    const [title, setTitle] = useState('');
    const [about, setAbout] = useState('');

    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-edit">
                <div className="edit-form">
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task"/>
                    <textarea value={about} onChange={(e) => setAbout(e.target.value)} placeholder="About..."/>
                </div>
                <div class="horizontal-flex">
                    <button type="button" className="text-button" onClick={onClose}>Cancel</button>
                    <button type="button" className="text-button" onClick={onClose}>Save</button>
                </div>
            </div>
        </div>
    );
}

export default EditModal;
