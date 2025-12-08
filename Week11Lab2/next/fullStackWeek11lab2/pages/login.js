import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function UserLoginComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
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
        router.push('/trek-microservice');
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
                <button className='btn btn-primary mb-2' type="submit" disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </button>
                <Link href='/register'>
                  <button className='btn btn-secondary mb-2' type="button">
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
