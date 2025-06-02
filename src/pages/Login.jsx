import { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { useNavigate } from 'react-router-dom';

const ADMIN_EMAIL = "admin@example.com";     // Replace with actual admin email
const ADMIN_PASSWORD = "adminpassword123";   // Replace with actual admin password

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
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

  const loginWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
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

  const loginAsAdmin = async () => {
    setEmail(ADMIN_EMAIL);
    setPassword(ADMIN_PASSWORD);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD);
      navigate('/admin');
    } catch (err) {
      alert('Failed to login as Admin: ' + err.message);
    }
  };

  return (
    <form onSubmit={login}>
      <h2>Login</h2>
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
      <button type="submit">Login</button>
      <button type="button" onClick={loginWithGoogle}>Login with Google</button>
      <button type="button" onClick={loginAsAdmin}>Login as Admin</button>
      <p>Don't have an account? <a href="/signup">Sign up</a></p>
    </form>
  );
};

export default Login;
