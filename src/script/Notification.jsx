import React from 'react';

function Notification({ message }) {
    return (
        <div id="notification" className={`notification ${message ? 'show' : ''}`}>
            {message}
        </div>
    );
}

export default Notification;