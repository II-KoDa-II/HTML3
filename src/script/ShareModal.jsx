import React from 'react';

function ShareModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-share" onClick={e => e.stopPropagation()}>
                <button id="copy-task"><img src="src/assets/icons/copy.svg"/></button>
                <button className="sharing-option"><img src="src/assets/icons/vk.svg"/></button>
                <button className="sharing-option"><img src="src/assets/icons/telegram.svg"/></button>
                <button className="sharing-option"><img src="src/assets/icons/whatsapp.svg"/></button>
                <button className="sharing-option"><img src="src/assets/icons/facebook.svg"/></button>
            </div>
        </div>
    );
}

export default ShareModal;
