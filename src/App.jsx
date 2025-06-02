import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Admin from './pages/Admin';

const App = () => {
  return (
    <div>


      <Routes>
                <Route path="/Login" element={<Login/>} />
                <Route path="/home" element={<Home />} />
                <Route path="/" element={<Signup/>} />
                <Route path='/Admin' element={<Admin/>}/>
                <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
};

export default App;
