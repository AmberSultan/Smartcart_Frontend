import React, { useEffect, useState } from 'react';
import './CartItem.css';

function CartItem() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  // Fetch all orders from the API
  useEffect(() => {
    const fetchOrders = async () => {
      if (!BASE_URL) {
        setError('BASE_URL not found.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/checkoutorder/checkout`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Orders API Response:', data);

        if (data.message && data.checkouts === undefined) {
          throw new Error(data.message);
        }

        if (!data.checkouts || !data.checkouts.length) {
          setOrders([]);
        } else {
          const sortedOrders = data.checkouts.sort((a, b) =>
            new Date(b.createdAt) - new Date(a.createdAt)
          );
          setOrders(sortedOrders);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [BASE_URL]);

  // Function to mark an order as completed (local state update)
  const markOrderAsCompleted = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === orderId ? { ...order, orderStatus: 'Completed' } : order
      )
    );
  };

  // Render loading, error, or orders list
  if (loading) {
    return <div className="loading">Loading orders...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="admin px-4">
      <h2 className="adminhead mt-4 mb-4">All Orders</h2>
      {orders.length > 0 ? (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Store Location</th>
              <th>Delivery Location</th>
              <th>Total Price</th>
              <th>Order Status</th>
              <th>Action</th> {/* New column for the button */}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id ? `ORD-${order._id.slice(-4)}` : 'N/A'}</td>
                <td>{order.personalInfo?.name || 'N/A'}</td>
                <td>{order.personalInfo?.phone || 'N/A'}</td>
                <td>{order.storeLocation || 'N/A'}</td>
                <td>{order.deliveryAddress?.addressDetails || 'N/A'}</td>
                <td>Rs.{order.orderDetails?.totalPrice || 'N/A'}</td>
                <td
                  className={
                    order.orderStatus === 'Pending'
                      ? 'status-pending'
                      : order.orderStatus === 'Completed'
                      ? 'status-completed'
                      : ''
                  }
                >
                  {order.orderStatus || 'N/A'}
                </td>
                <td>
                  {order.orderStatus === 'Pending' ? (
                    <button
                      className="complete-btn"
                      onClick={() => markOrderAsCompleted(order._id)}
                    >
                      Complete
                    </button>
                  ) : (
                    '—' // Display a dash for non-pending orders
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders available.</p>
      )}
    </div>
  );
}

export default CartItem;