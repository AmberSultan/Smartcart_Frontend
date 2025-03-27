import React, { useEffect, useState } from 'react';

function Notification() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  
  // Function to format the order ID
  const formatOrderId = (id) => {
    if (!id) return 'N/A';
    const last4Digits = id.slice(-4); // Get last 4 characters
    return `ORD-${last4Digits}`;
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/checkoutorder/checkout`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('API Response:', data);
        setOrders(data.checkouts || []);
      } catch (error) {
        console.error('Error fetching order:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrder();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="borderchart1 me-2 ms-2">
        <h5 className='mt-3 fw-bold text-success meal-categories-heading'>Order Details</h5>
        {orders.length > 0 ? (
          orders.map(order => (
            <React.Fragment key={order._id}>
              <div className="notification-item m-3 d-flex justify-content-between align-items-center mb-2">
                <div>
                  <p className="mb-0"><strong>Order ID: </strong>{formatOrderId(order._id)}</p>
                  <p className="mb-0"><strong>Order Status: </strong>{order.orderStatus || 'N/A'}</p>
                </div>
                <small className="text-muted">
                  {order.createdAt ? new Date(order.createdAt).toLocaleString() : 'N/A'}
                </small>
              </div>
              <hr />
            </React.Fragment>
          ))
        ) : (
          <p>No order data available</p>
        )}
      </div>
    </div>
  );
}

export default Notification;