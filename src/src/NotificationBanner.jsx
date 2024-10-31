import React from 'react';

const NotificationBanner = ({ onClose, onOpenPolicy }) => {
    return (
        <div className="notification-banner">
            <p>
                We have updated our <button onClick={onOpenPolicy} className="policy-button">Privacy Policy</button> 
            </p>
            <button onClick={onClose}>Dismiss</button>
        </div>
    );
};

export default NotificationBanner;
