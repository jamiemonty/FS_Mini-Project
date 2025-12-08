import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function RegisterComponent() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    location: ''
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    setLoading(true);
    const accountId = 'USR' + Date.now().toString().slice(-6);

    try {
      const response = await fetch('/api/create-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, accountId })
      });

      const data = await response.json();

      if (data.response === 'success') {
        setShowPopup(true);
        setTimeout(() => {
          router.push('/login');
        }, 1500);
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {showPopup && (
        <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1000, padding: '1rem 1.5rem', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', background: '#2196F3', color: 'white', fontWeight: 'bold', animation: 'slideIn 0.3s ease-out' }}>
          ✅ Account created successfully!
        </div>
      )}
      <style jsx>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
      <div className='row'>
        <div className='card col-md-6 offset-md-3' style={{ marginTop: '2rem' }}>
          <div className='header' style={{ background: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)', color: 'white', padding: '2rem', borderRadius: '8px 8px 0 0' }}>
            <div className='icon' style={{ fontSize: '3rem' }}>📝</div>
            <h2 className='title' style={{ margin: '0.5rem 0', fontSize: '2rem' }}>Create Account</h2>
            <p className='subtitle' style={{ margin: 0, opacity: 0.9 }}>Join our trekking community</p>
          </div>
          <div className='card-body' style={{ padding: '2rem' }}>
            <form onSubmit={handleRegister}>
              <div className='form-group mb-2'>
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  placeholder='Enter Full Name'
                  name='name'
                  id="name"
                  className='form-control'
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='form-group mb-2'>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  placeholder='Enter Email'
                  name='email'
                  id="email"
                  className='form-control'
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='form-group mb-2'>
                <label htmlFor="password">Password:</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder='Enter Password'
                    name='password'
                    id="password"
                    className='form-control'
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>
              <div className='form-group mb-2'>
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder='Re-enter Password'
                    name='confirmPassword'
                    id="confirmPassword"
                    className='form-control'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}
                  >
                    {showConfirmPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>
              <div className='form-group mb-2'>
                <label htmlFor="location">Location:</label>
                <input
                  type="text"
                  placeholder='Enter Location'
                  name='location'
                  id="location"
                  className='form-control'
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>
              {error && <p className="text-danger">{error}</p>}
              <div style={{display: 'flex', gap: '10px', marginTop: '1rem'}}>
                <button className='btn mb-2' type="submit" disabled={loading} style={{ background: '#2196F3', color: 'white', padding: '0.5rem 1.5rem', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  {loading ? 'Creating Account...' : 'Register'}
                </button>
                <Link href='/login'>
                  <button className='btn btn-secondary mb-2' type="button">
                    Back to Login
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
