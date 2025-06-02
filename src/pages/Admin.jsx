import React, { useState, useEffect } from 'react';
import './Admin.css'; // Importing the CSS file

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    productid: Date.now(),
    title: '',
    price: '',
    description: '',
    category: '',
    image: '',
    rate: ''
  });
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const apiUrl = 'http://localhost:4000/api/fakestore';

  const fetchProducts = async () => {
    const res = await fetch(apiUrl);
    const data = await res.json();
    setProducts(data.fakestore);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.name === "price" || e.target.name === "rate"
        ? Number(e.target.value)
        : e.target.value,
    });
  };

  const addProduct = async () => {
    const productToAdd = { ...form, productid: Date.now() };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productToAdd),
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      setForm({
        productid: Date.now(),
        title: '',
        price: '',
        description: '',
        category: '',
        image: '',
        rate: ''
      });

      fetchProducts();
      showToast('Product added successfully!', 'success');
    } catch (error) {
      showToast('Failed to add product', 'error');
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      setDeleteConfirm(null);
      fetchProducts();
      showToast('Product deleted successfully!', 'success');
    } catch (error) {
      showToast('Failed to delete product', 'error');
    }
  };

  const showToast = (message, type = 'success') => {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  };

  return (
    <div className="admin-container">
      <h2>Add New Product</h2>
      <div className="form">
        <input 
          className="form-control"
          name="title" 
          value={form.title} 
          onChange={handleChange} 
          placeholder="Title" 
        />
        <input 
          className="form-control"
          name="price" 
          value={form.price} 
          onChange={handleChange} 
          placeholder="Price" 
          type="number"
        />
        <input 
          className="form-control"
          name="description" 
          value={form.description} 
          onChange={handleChange} 
          placeholder="Description" 
        />
        <input 
          className="form-control"
          name="category" 
          value={form.category} 
          onChange={handleChange} 
          placeholder="Category" 
        />
        <input 
          className="form-control"
          name="image" 
          value={form.image} 
          onChange={handleChange} 
          placeholder="Image URL" 
        />
        <input 
          className="form-control"
          name="rate" 
          value={form.rate} 
          onChange={handleChange} 
          placeholder="Rating" 
          type="number"
          min="0"
          max="5"
          step="0.1"
        />
        <button className="btn btn-primary" onClick={addProduct}>Add Product</button>
      </div>

      <h2>Product List</h2>
      <div className="products-grid">
        {products.map(p => (
          <div key={p._id} className="card product-card">
            <img src={p.image} alt={p.title} />
            <h3>{p.title}</h3>
            <p className="price">₹{p.price}</p>
            <p>{p.category}</p>
            {deleteConfirm === p._id ? (
              <div className="delete-confirm">
                <p>Are you sure?</p>
                <div className="delete-actions">
                  <button 
                    className="btn btn-danger"
                    onClick={() => deleteProduct(p._id)}
                  >
                    Yes, Delete
                  </button>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => setDeleteConfirm(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button 
                className="btn btn-danger"
                onClick={() => setDeleteConfirm(p._id)}
              >
                Remove
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
