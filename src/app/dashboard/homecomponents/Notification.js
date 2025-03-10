import React from 'react';

function Notification() {
  // Dummy notifications data
  const notifications = [
    { id: 1, message: 'Your order has been shipped.', updatedAt: '10:00 AM' },
    { id: 2, message: 'New message from support.', updatedAt: '11:30 AM' },
    { id: 3, message: 'Payment received for order #12345.', updatedAt: '1:00 PM' },
    { id: 4, message: 'Your account has been updated.', updatedAt: '3:45 PM' },
  ];

  return (
    <div>
      <div className="borderchart1 me-2 ms-2">
        <h5 className='mt-3 fw-bold text-success meal-categories-heading'>Order Details</h5>
        {notifications.map(notification => (
          <div key={notification.id} className="notification-item m-3 d-flex justify-content-between align-items-center mb-2">
            <p className="mb-0">{notification.message}</p>
            <small className="text-muted">{notification.updatedAt}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notification;