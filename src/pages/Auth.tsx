import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PackageOpen } from 'lucide-react';
import './Auth.css';
import api from "../api/api";

interface AuthProps {
  onLogin: (email: string) => void;
}

export const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  
  // Login State
  const [email, setEmail] = useState('admin@inventai.com');
  const [password, setPassword] = useState('password');

  // Signup State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regStoreName, setRegStoreName] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Simulating Real Database logic using LocalStorage Users Registry
    const usersDB = JSON.parse(localStorage.getItem('inventai_users') || '{}');

    if (isLogin) {
      try {
        const response = await api.post("/auth/login", {
          email,
          password,
        });

        localStorage.setItem("token", response.data.access_token);

        onLogin(email);
        navigate("/dashboard");
      } catch (err: any) {
        setError(
          err.response?.data?.detail || "Invalid login credentials."
        );
      }
    } else {
      // Handle Sign Up
      if (regPassword !== regConfirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      if (usersDB[regEmail]) {
        setError('An account with this email already exists.');
        return;
      }

      // Create new owner account logic
      usersDB[regEmail] = {
        name: regName,
        email: regEmail,
        phone: regPhone,
        password: regPassword, // In a real DB this would be hashed
        storeName: regStoreName
      };

      localStorage.setItem('inventai_users', JSON.stringify(usersDB));

      // Inject initial store settings for this specific owner boundary
      const ownerStoreKey = `inventai_${regEmail}_storeDetails`;
      const ownerProfileKey = `inventai_${regEmail}_adminProfile`;
      
      localStorage.setItem(ownerStoreKey, JSON.stringify({
        name: regStoreName,
        currency: 'INR',
        address: '',
        gst: ''
      }));

      localStorage.setItem(ownerProfileKey, JSON.stringify({
        name: regName,
        email: regEmail,
        phone: regPhone,
        role: 'Administrator'
      }));

      setSuccess('Account created successfully! Logging you in...');
      
      // Auto-login after brief delay
      setTimeout(() => {
        onLogin(regEmail);
        navigate('/dashboard');
      }, 1500);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card" style={{ maxWidth: isLogin ? '400px' : '550px', transition: 'max-width 0.3s' }}>
        <div className="auth-header">
          <div className="auth-logo">
            <PackageOpen size={32} />
          </div>
          <h2>{isLogin ? 'Welcome to InventAI' : 'Create an Account'}</h2>
          <p>{isLogin ? 'Sign in to manage your operations.' : 'Register your business for premium tools.'}</p>
        </div>

        {error && <div className="badge badge-danger" style={{ display: 'block', marginBottom: '1rem', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>{error}</div>}
        {success && <div className="badge badge-success" style={{ display: 'block', marginBottom: '1rem', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>{success}</div>}

        <form onSubmit={handleAuth} className="auth-form">
          {isLogin ? (
            <>
              <div className="input-group">
                <label className="input-label">Email Address</label>
                <input type="email" className="input-field" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <div className="input-group">
                <label className="input-label">Password</label>
                <input type="password" className="input-field" value={password} onChange={e => setPassword(e.target.value)} required />
              </div>
              <button type="submit" className="btn btn-primary btn-block">Sign In</button>
            </>
          ) : (
            <div className="grid grid-cols-2" style={{ gap: '1rem' }}>
              <div className="input-group" style={{ gridColumn: 'span 2' }}>
                <label className="input-label">Business / Store Name</label>
                <input type="text" className="input-field" value={regStoreName} onChange={e => setRegStoreName(e.target.value)} required />
              </div>
              <div className="input-group">
                <label className="input-label">Owner Full Name</label>
                <input type="text" className="input-field" value={regName} onChange={e => setRegName(e.target.value)} required />
              </div>
              <div className="input-group">
                <label className="input-label">Phone Number</label>
                <input type="tel" className="input-field" value={regPhone} onChange={e => setRegPhone(e.target.value)} required />
              </div>
              <div className="input-group" style={{ gridColumn: 'span 2' }}>
                <label className="input-label">Email Address</label>
                <input type="email" className="input-field" value={regEmail} onChange={e => setRegEmail(e.target.value)} required />
              </div>
              <div className="input-group">
                <label className="input-label">Password</label>
                <input type="password" className="input-field" value={regPassword} onChange={e => setRegPassword(e.target.value)} required />
              </div>
              <div className="input-group">
                <label className="input-label">Confirm Password</label>
                <input type="password" className="input-field" value={regConfirmPassword} onChange={e => setRegConfirmPassword(e.target.value)} required />
              </div>
              
              <div style={{ gridColumn: 'span 2', marginTop: '1rem' }}>
                <button type="submit" className="btn btn-primary btn-block" style={{ width: '100%' }}>Create Account</button>
              </div>
            </div>
          )}
        </form>
        
        <div className="auth-footer" style={{ marginTop: '2rem', borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
          <p>
            {isLogin ? "Don't have an account? " : "Already have a business account? "}
            <a onClick={() => setIsLogin(!isLogin)} style={{ cursor: 'pointer', fontWeight: 'bold' }}>
              {isLogin ? 'Sign Up' : 'Log In'}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
