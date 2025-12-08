import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function UserLoginComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  const verifyUserDetails = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.user));
        window.dispatchEvent(new Event('login'));
        setShowPopup(true);
        setTimeout(() => {
          router.push('/trek-microservice');
        }, 1500);
      } else {
        setError(data.message || 'Invalid email or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {showPopup && (
        <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1000, padding: '1rem 1.5rem', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', background: '#4CAF50', color: 'white', fontWeight: 'bold', animation: 'slideIn 0.3s ease-out' }}>
          ✅ Successfully logged in!
        </div>
      )}
      <style jsx>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
      <div className='row'>
        <div className='card col-md-6 offset-md-3'>
          <div className='header'>
            <div className='icon'>🔐</div>
            <h2 className='title'>Welcome Back</h2>
            <p className='subtitle'>Sign in to access your trekking dashboard</p>
          </div>
          <div className='card-body'>
            <form onSubmit={verifyUserDetails}>
              <div className='form-group mb-2'>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  placeholder='Enter Email'
                  name='email'
                  id="email"
                  className='form-control'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className='form-group mb-2'>
                <label className='form-label'>Password:</label>
                <input
                  type="password"
                  placeholder='Enter Password'
                  name='password'
                  id="password"
                  className='form-control'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-danger">{error}</p>}
              <div style={{display: 'flex', gap: '10px', marginLeft: '10px'}}>
                <button className='btn mb-2' type="submit" disabled={loading} style={{ background: '#4CAF50', color: 'white', padding: '0.5rem 1.5rem', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  {loading ? 'Logging in...' : 'Login'}
                </button>
                <Link href='/register'>
                  <button className='btn mb-2' type="button" style={{ background: '#2196F3', color: 'white', padding: '0.5rem 1.5rem', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Register
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
