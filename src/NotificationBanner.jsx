import React from 'react';
import './index.css';

const NotificationBanner = ({ onClose, onOpenPolicy }) => {
    return (
        <div className="notification-banner">
            <p>This app uses your location to provide weather updates.</p>
            <button onClick={onOpenPolicy}>Read Privacy Policy</button>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default NotificationBanner;
