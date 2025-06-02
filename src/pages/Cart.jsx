import React from 'react';
import { useLocation } from 'react-router-dom';

const Cart = () => {
  const location = useLocation();
  const cart = location.state?.cart || [];

  return (
    <div>
      <h2>🛒 Cart Page</h2>
      {cart.length === 0 ? (
        <p>No items in the cart.</p>
      ) : (
        cart.map((item, index) => (
          <div key={index} style={{ border: '1px solid gray', margin: 10, padding: 10 }}>
            <h4>{item.title}</h4>
            <img src={item.image} alt={item.title} height="80" />
            <p>${item.price}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
