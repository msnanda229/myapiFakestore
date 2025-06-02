import { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const ADMIN_EMAIL = 'admin@example.com';     // Replace with your admin email
const ADMIN_PASSWORD = 'adminpassword123';   // Replace with your admin password

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const signup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userEmail = userCredential.user.email;

      if (userEmail === ADMIN_EMAIL) {
        navigate('/admin');
      } else {
        navigate('/home');
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const signupAsAdmin = async () => {
    try {
      // Try to sign in first with admin credentials
      await signInWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD);
      navigate('/admin');
    } catch (signInErr) {
      // If sign in fails (user doesn't exist), create the admin user
      try {
        await createUserWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD);
        navigate('/admin');
      } catch (signupErr) {
        alert('Admin signup failed: ' + signupErr.message);
      }
    }
  };

  return (
    <form onSubmit={signup}>
      <h2>Signup</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Signup</button>
      <button type="button" onClick={signupAsAdmin}>Signup as Admin</button>
      <p>Already have an account? <a href="/login">Login</a></p>
    </form>
  );
};

export default Signup;
