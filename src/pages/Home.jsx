import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
const [user, setUser] = useState(null);

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
  return () => unsubscribe();
}, []);

  useEffect(() => {
    fetch('http://localhost:4000/api/fakestore/')
      .then(res => res.json())
      .then(data => {
        setProducts(data.fakestore);
        setFiltered(data.fakestore);
      });
  }, []);

  const handleAddToCart = (product) => {
    setCart(prev => [...prev, product]);
  };

  const filterByCategory = (category) => {
    const result = products.filter(p => p.category === category);
    setFiltered(result);
  };

  const showAll = () => setFiltered(products);

  const goToCartPage = () => {
    navigate('/cart', { state: { cart } });
  };

  return (
    <>
      {/* ✅ Pass cart count directly from here */}
      <Navbar user={user} cartCount={cart.length} onCartClick={goToCartPage} />

      <div className="home-container">
        {/* ✅ Category Filters */}
        <div style={{ marginBottom: '20px' }}>
          <button className="category-button" onClick={showAll}>All</button>
          <button className="category-button" onClick={() => filterByCategory("men's clothing")}>Men's Clothing</button>
          <button className="category-button" onClick={() => filterByCategory("women's clothing")}>Women's Clothing</button>
        </div>

        {/* ✅ Product Cards */}
        <div className="product-grid">
          {filtered.map((product) => (
            <div key={product.id} className="product-card">
              <h4>{product.title}</h4>
              <img src={product.image} alt={product.title} />
              <p><strong>${product.price}</strong></p>
              <p style={{ fontSize: '13px', flexGrow: 1 }}>{product.description.slice(0, 60)}...</p>
              <button className="add-button" onClick={() => handleAddToCart(product)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
